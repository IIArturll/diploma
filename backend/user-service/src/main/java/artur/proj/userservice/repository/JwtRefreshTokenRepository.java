package artur.proj.userservice.repository;

import artur.proj.commonclasses.entities.JwtRefreshTokenEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface JwtRefreshTokenRepository extends CrudRepository<JwtRefreshTokenEntity, UUID> {
    Optional<JwtRefreshTokenEntity> findByToken(String token);
    void deleteByToken(String token);
    void deleteByEmail(String email);
}
