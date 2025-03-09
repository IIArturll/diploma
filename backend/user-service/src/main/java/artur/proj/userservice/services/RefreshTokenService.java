package artur.proj.userservice.services;

import artur.proj.commonclasses.entities.JwtRefreshTokenEntity;

public interface RefreshTokenService {
    JwtRefreshTokenEntity createRefreshToken(String email);
    boolean validateRefreshToken(String token);
    String getEmailFromToken(String token);
    void deleteRefreshToken(String token);
}
