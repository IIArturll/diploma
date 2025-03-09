package artur.proj.userservice.services.impl;

import artur.proj.commonclasses.entities.JwtRefreshTokenEntity;
import artur.proj.commonclasses.exceptions.users.InvalidRefreshToken;
import artur.proj.userservice.repository.JwtRefreshTokenRepository;
import artur.proj.userservice.services.RefreshTokenService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@Transactional
public class JwtRefreshTokenService implements RefreshTokenService {
    private final JwtRefreshTokenRepository repository;

    public JwtRefreshTokenService(JwtRefreshTokenRepository repository) {
        this.repository = repository;
    }

    public JwtRefreshTokenEntity createRefreshToken(String email) {
        JwtRefreshTokenEntity refreshToken = JwtRefreshTokenEntity.builder()
                .token(UUID.randomUUID().toString()) // Генерация уникального токена
                .email(email)
                .expiryDate(Instant.now().plusSeconds(7 * 24 * 60 * 60)) // 30 дней
                .build();
        return repository.save(refreshToken);
    }

    public boolean validateRefreshToken(String token) {
        return repository.findByToken(token)
                .filter(rt -> rt.getExpiryDate().isAfter(Instant.now()))
                .isPresent();
    }

    public String getEmailFromToken(String token) {
        return repository.findByToken(token)
                .map(JwtRefreshTokenEntity::getEmail)
                .orElseThrow(()->new InvalidRefreshToken("Invalid refresh token"));
    }

    public void deleteRefreshToken(String token) {
        repository.deleteByToken(token);
    }
}
