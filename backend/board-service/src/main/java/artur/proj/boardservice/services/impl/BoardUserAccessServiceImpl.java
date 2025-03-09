package artur.proj.boardservice.services.impl;

import artur.proj.boardservice.controllers.client.EmailClient;
import artur.proj.boardservice.controllers.client.UserClient;
import artur.proj.boardservice.repositories.BoardRepository;
import artur.proj.boardservice.repositories.BoardUserAccessRepository;
import artur.proj.boardservice.services.BoardUserAccessService;

import artur.proj.commonclasses.entities.BoardEntity;
import artur.proj.commonclasses.entities.BoardUserAccessEntity;
import artur.proj.commonclasses.entities.InvitationStatus;
import artur.proj.commonclasses.entities.UserEntity;
import artur.proj.commonclasses.exceptions.boards.*;
import artur.proj.commonclasses.exceptions.users.NotAuthenticatedException;
import artur.proj.commonclasses.exceptions.users.UserNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
@Transactional
public class BoardUserAccessServiceImpl implements BoardUserAccessService {
    private final BoardUserAccessRepository accessRepository;
    private final BoardRepository boardRepository;
    private final UserClient userClient;
    private final EmailClient emailClient;
    private final BoardEventPublisher boardEventPublisher;

    public BoardUserAccessServiceImpl(BoardUserAccessRepository accessRepository,
                                      BoardRepository boardRepository,
                                      UserClient userClient,
                                      EmailClient emailClient, BoardEventPublisher boardEventPublisher) {
        this.accessRepository = accessRepository;
        this.boardRepository = boardRepository;
        this.userClient = userClient;
        this.emailClient = emailClient;
        this.boardEventPublisher = boardEventPublisher;
    }

    @Override
    public void sendInvite(UUID boardId, String email) {
        UserEntity authorizedUser = getAuthorizedUser();
        BoardEntity board = getBoardById(boardId);

        if (!board.getOwner().getId().equals(authorizedUser.getId())) {
            throw new NotOwnerException();
        }

        UserEntity invitedUser = getUserByEmail(email);
        BoardUserAccessEntity boardUserAccessEntity = new BoardUserAccessEntity();
        boardUserAccessEntity.setBoard(board);
        boardUserAccessEntity.setUser(invitedUser);
        BoardUserAccessEntity savedEntity = accessRepository.save(boardUserAccessEntity);

        boardEventPublisher.publishEvent(savedEntity);
    }
    @TransactionalEventListener
    public void onInviteEvent(BoardUserAccessEntity savedEntity) {
        CompletableFuture.runAsync(() -> emailClient.sendInviteEmail(
                savedEntity.getUser().getEmail(),
                savedEntity.getId().toString(),
                savedEntity.getBoard().getName()
        ));
    }


    @Override
    public void kickUser(UUID boardId, String email) {
        UserEntity authorizedUser = getAuthorizedUser();
        BoardEntity board = getBoardById(boardId);

        if (!board.getOwner().getId().equals(authorizedUser.getId())) {
            throw new NotOwnerException();
        }

        UserEntity user = getUserByEmail(email);
        user.getBoards().stream()
                .filter(boardEntity -> boardEntity.getId().equals(boardId))
                .findFirst()
                .orElseThrow(UnauthorizedAccessException::new);

        BoardUserAccessEntity accessEntity = accessRepository.findByBoardAndUser(board, user);
        accessEntity.getUser().getBoards().remove(board);
        accessEntity.setStatus(InvitationStatus.KICKED);
        accessRepository.save(accessEntity);
    }

    @Override
    public void respondInvite(UUID inviteCode, boolean accept) {
        BoardUserAccessEntity boardUserAccessEntity = accessRepository.findById(inviteCode)
                .orElseThrow(() -> new InviteNotFoundException(inviteCode));

        if (!getAuthorizedUser().getEmail().equals(boardUserAccessEntity.getUser().getEmail())) {
            throw new NotInvitedUserException();
        }

        if (boardUserAccessEntity.getStatus() != InvitationStatus.PENDING) {
            throw new InviteAlreadyRespondedException();
        }

        BoardEntity board = boardUserAccessEntity.getBoard();
        if (board == null) throw new BoardNotFoundException(inviteCode);
        if (accept) {
            boardUserAccessEntity.getUser().getBoards().add(board);
            boardUserAccessEntity.setStatus(InvitationStatus.ACCEPTED);
        } else {
            boardUserAccessEntity.setStatus(InvitationStatus.REJECTED);
        }
        accessRepository.save(boardUserAccessEntity);
    }

    private UserEntity getAuthorizedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new NotAuthenticatedException();
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        return getUserByEmail(username);
    }

    private BoardEntity getBoardById(UUID boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BoardNotFoundException(boardId));
    }

    private UserEntity getUserByEmail(String email) {
        return userClient.getUserEntityByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
    }

}
