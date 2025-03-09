package artur.proj.boardservice.services.impl;

import artur.proj.boardservice.controllers.client.UserClient;
import artur.proj.boardservice.core.dtos.*;
import artur.proj.boardservice.core.mappers.Mappers;
import artur.proj.boardservice.repositories.BoardRepository;
import artur.proj.boardservice.services.BoardService;
import artur.proj.boardservice.services.TagService;
import artur.proj.commonclasses.entities.*;
import artur.proj.commonclasses.exceptions.boards.BoardNotFoundException;
import artur.proj.commonclasses.exceptions.boards.TaskNotFoundException;
import artur.proj.commonclasses.exceptions.boards.UnauthorizedAccessException;
import artur.proj.commonclasses.exceptions.users.NotAuthenticatedException;
import artur.proj.commonclasses.exceptions.users.UserNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@Transactional
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final Mappers mapper;
    private final TagService tagService;
    private final UserClient userClient;

    public BoardServiceImpl(BoardRepository boardRepository, TagService tagService,
                            Mappers mapper, UserClient userClient) {

        this.boardRepository = boardRepository;
        this.tagService = tagService;
        this.userClient = userClient;
        this.mapper = mapper;
    }

    @Override
    public void create(BoardCreateDTO dto) {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setName(dto.name());
        boardEntity.setDescription(dto.description());
        boardEntity.setType(dto.type());
        boardEntity.setOwner(getAuthorizedUser());
        boardRepository.save(boardEntity);
    }

    @Override
    public BoardDTO getById(UUID id) {
        BoardEntity board = boardRepository.findById(id).orElseThrow(
                () -> new BoardNotFoundException(id));
        getAuthorizedUser().getBoards().stream().filter(b->b.getId().equals(id)).findFirst()
                .orElseThrow(UnauthorizedAccessException::new);
        return mapper.toDTO(board);

    }

    @Override
    public List<BoardNameDTO> getAllNamesOfBoard() {
        return mapper.toBoardNameDTO(getAuthorizedUser().getBoards());
    }

    @Override
    public void update(BoardDTO dto) {
        BoardEntity boardEntity = boardRepository.findById(dto.id())
                .orElseThrow(() -> new BoardNotFoundException(dto.id()));
        getAuthorizedUser().getBoards().stream().filter(b->b.getId().equals(dto.id())).findFirst()
                .orElseThrow(UnauthorizedAccessException::new);
        Optional.ofNullable(dto.name()).filter(name -> !name.isBlank()).ifPresent(boardEntity::setName);
        Optional.ofNullable(dto.description()).filter(desc -> !desc.isBlank()).ifPresent(boardEntity::setDescription);

        if (dto.tasks() != null && !dto.tasks().isEmpty()) {
            Map<UUID, TaskEntity> taskMap = boardEntity.getTasks().stream()
                    .collect(Collectors.toMap(TaskEntity::getId, task -> task));

            for (TaskDTO t : dto.tasks()) {
                TaskEntity taskEntity = Optional.ofNullable(taskMap.get(t.id()))
                        .orElseThrow(() -> new RuntimeException("No task with this id"));

                Optional.ofNullable(t.description()).filter(desc -> !desc.isBlank()).ifPresent(taskEntity::setDescription);
                Optional.ofNullable(t.status()).ifPresent(status -> updateTaskStatus(taskEntity, status));
                Optional.ofNullable(t.positionY()).ifPresent(taskEntity::setPositionY);
                Optional.ofNullable(t.tags()).filter(tags -> !tags.isEmpty()).ifPresent(tags -> updateTaskTags(taskEntity, tags));
            }
        }
        boardRepository.save(boardEntity);
    }

    private void updateTaskStatus(TaskEntity taskEntity, TaskStatus status) {
        taskEntity.setStatus(status);
        Instant now = Instant.now();

        switch (status) {
            case PENDING -> {
                taskEntity.setStartedAt(null);
                taskEntity.setEndedAt(null);
            }
            case RUNNING -> taskEntity.setStartedAt(Timestamp.from(now));
            case COMPLETED -> {
                if (taskEntity.getStartedAt() == null) {
                    taskEntity.setStartedAt(Timestamp.from(now));
                }
                taskEntity.setEndedAt(Timestamp.from(now));
            }
        }
    }

    private void updateTaskTags(TaskEntity taskEntity, List<TagDTO> tags) {
        List<TagEntity> tagEntities = tags.stream()
                .map(tagDTO -> tagService.getByTag(tagDTO.tag()))
                .collect(Collectors.toList());
        taskEntity.setTags(tagEntities);
    }

    @Override
    public void addTask(UUID boardId, TaskDTO dto) {
        BoardEntity boardEntity = boardRepository.findById(boardId).orElseThrow(
                () -> new BoardNotFoundException(boardId));
        getAuthorizedUser().getBoards().stream().filter(b->b.getId().equals(boardId)).findFirst()
                .orElseThrow(UnauthorizedAccessException::new);
        TaskEntity entity = mapper.toEntity(dto);
        entity.setOwner(getAuthorizedUser());
        List<TagEntity> tagEntityList = entity.getTags().stream()
                .map(tagEntity -> tagService.getByTag(tagEntity.getTag())).collect(Collectors.toList());
        entity.setTags(tagEntityList);
        boardEntity.getTasks().add(entity);
        boardRepository.save(boardEntity);
    }

    @Override
    public void removeTask(UUID boardId, UUID taskId) {
        BoardEntity boardEntity = boardRepository.findById(boardId).orElseThrow(
                () -> new BoardNotFoundException(boardId));
        getAuthorizedUser().getBoards().stream().filter(b->b.getId().equals(boardId)).findFirst()
                .orElseThrow(UnauthorizedAccessException::new);
        boardEntity.getTasks().remove(boardEntity.getTasks().stream()
                .filter(t -> t.getId().equals(taskId))
                .findFirst().orElseThrow(
                        () -> new TaskNotFoundException(taskId)));
        boardRepository.save(boardEntity);
    }

    @Override
    public void delete(UUID id) {
        final BoardEntity boardEntity = boardRepository.findById(id).orElseThrow(
                ()-> new BoardNotFoundException(id));
        if(!boardEntity.getOwner().getId().equals(getAuthorizedUser().getId())) {
            throw new UnauthorizedAccessException();
        }
        boardRepository.deleteById(id);
    }

    private UserEntity getAuthorizedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new NotAuthenticatedException();
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        return userClient.getUserEntityByEmail(username).orElseThrow(
                () -> new UserNotFoundException(username));
    }

}
