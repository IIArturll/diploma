package artur.proj.userservice.services.impl;

import artur.proj.commonclasses.entities.UserEntity;
import artur.proj.commonclasses.entities.UserStatus;
import artur.proj.commonclasses.exceptions.users.*;
import artur.proj.commonclasses.security.JWTTokenUtil;
import artur.proj.commonclasses.security.MyUserDetails;
import artur.proj.userservice.controllers.client.EmailClient;
import artur.proj.userservice.core.dtos.AuthDTO;
import artur.proj.userservice.core.dtos.UserCreateDTO;
import artur.proj.userservice.core.dtos.UserDTO;
import artur.proj.userservice.core.dtos.UserLoginDTO;
import artur.proj.userservice.core.mappers.UserMapper;
import artur.proj.userservice.repository.UserRepository;
import artur.proj.userservice.security.MyUserDetailsService;
import artur.proj.userservice.services.RefreshTokenService;
import artur.proj.userservice.services.UserService;
import jakarta.transaction.Transactional;
import org.springframework.context.event.EventListener;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final String emailValidationPattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
    private final MyUserDetailsService userDetailsService;
    private final JWTTokenUtil jwtTokenUtil;
    private final EmailClient emailClient;
    private final UserEventPublisher userEventPublisher;
    private final RefreshTokenService refreshTokenService;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper,
                           PasswordEncoder passwordEncoder, MyUserDetailsService userDetailsService,
                           JWTTokenUtil jwtTokenUtil, EmailClient emailClient,
                           UserEventPublisher userEventPublisher,
                           RefreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.emailClient = emailClient;
        this.userEventPublisher = userEventPublisher;
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    public void register(UserCreateDTO userDto) {
        Optional<UserEntity> byEmail = userRepository.findByEmail(userDto.email());
        if (byEmail.isPresent() && !byEmail.get().getStatus().equals(UserStatus.WAITING_ACTIVATION)) {
            throw new UserAlreadyExistsException(userDto.email());
        } else if (byEmail.isEmpty()) {
            UserEntity entity = userMapper.toEntity(userDto);
            entity.setPassword(passwordEncoder.encode(userDto.password()));
            userRepository.save(entity);
            userEventPublisher.publishEvent(entity);
        } else {
            UserEntity entity = byEmail.get();
            entity.setPassword(passwordEncoder.encode(userDto.password()));
            userRepository.save(entity);
            userEventPublisher.publishEvent(entity);
        }
    }

    @TransactionalEventListener
    public void handleUserCreatedEvent(UserEntity userEntity) {
        CompletableFuture.runAsync(() -> emailClient.sendVerificationEmail(userEntity.getEmail()));
//        emailClient.sendVerificationEmail(userEntity.getEmail());
    }

    @Override
    public UserDTO getMe() {
        return userMapper.toDto(getAuthorizedUser());
    }

    @Override
    public void verifyEmail(String email, String verificationCode) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() ->
                new UserNotFoundException(email));
        if (!user.getStatus().equals(UserStatus.WAITING_ACTIVATION)) {
            throw new UserNotWaitingActivationException(email);
        }
        if (emailClient.verify(email, verificationCode)) {
            user.setStatus(UserStatus.ACTIVATED);
            userRepository.save(user);
        } else {
            throw new InvalidVerificationCodeException();
        }
    }

    @Override
    public AuthDTO login(UserLoginDTO user) {
        String userIdentifier = user.email();
        UserEntity entity;
        if (userIdentifier.matches(emailValidationPattern)) {
            entity = userRepository.findByEmail(userIdentifier).orElseThrow(
                    () -> new UserNotFoundException(userIdentifier));
        } else {
            throw new InvalidEmailFormatException(userIdentifier);
        }
        if (entity.getStatus() == UserStatus.WAITING_ACTIVATION) {
            throw new UserNotVerifiedException(userIdentifier);
        }
        if (passwordEncoder.matches(user.password(), entity.getPassword())) {
            MyUserDetails userDetails = new MyUserDetails(entity);
            return new AuthDTO(jwtTokenUtil.generateAccessToken(userDetails),
                    refreshTokenService.createRefreshToken(userIdentifier).getToken());
        } else {
            throw new InvalidPasswordException();
        }
    }

    @Override
    public AuthDTO refreshToken(String refreshToken) {
        if (!refreshTokenService.validateRefreshToken(refreshToken)) {
            throw new InvalidRefreshToken("Invalid or expired refresh token");
        }
        String emailFromToken = refreshTokenService.getEmailFromToken(refreshToken);
        refreshTokenService.deleteRefreshToken(refreshToken);
        String newAccessToken = jwtTokenUtil.generateAccessToken(userDetailsService.loadUserByUsername(emailFromToken));
        String newRefreshToken = refreshTokenService.createRefreshToken(emailFromToken).getToken();
        return new AuthDTO(newAccessToken, newRefreshToken);
    }

    @Override
    public void logout(String refreshToken) {
        refreshTokenService.deleteRefreshToken(refreshToken);
    }


    private UserEntity getAuthorizedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new NotAuthenticatedException();
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        return userRepository.findByEmail(username).orElseThrow(
                () -> new UserNotFoundException(username));
    }

}
