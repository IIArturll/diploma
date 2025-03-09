package artur.proj.commonclasses.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Arrays;
import java.util.Date;

public class JWTTokenUtil {
    @Value("${jwt.access.secret}")
    private String jwtAccessSecret;

    @Value("${jwt.access.expirationSeconds}")
    private Long jwtAccessExpirationSeconds;
    @Value("")
    private Long jwtRefreshExpirationSeconds;

    private SecretKey getSigningKey() {
        byte[] keyBytes = Arrays.copyOf(jwtAccessSecret.getBytes(StandardCharsets.UTF_8), 64);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    public String generateAccessToken(MyUserDetails userDetails) {
        String compact = Jwts.builder()
                .subject(userDetails.getEmail())
                .issuedAt(new Date())
                .expiration(Date.from(Instant.now().plusSeconds(jwtAccessExpirationSeconds)))
                .claim("role", "USER")
                .signWith(getSigningKey(), Jwts.SIG.HS512)
                .compact();
        return compact;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException expEx) {
            System.out.println("ExpiredJwtException: " + expEx.getMessage());
            handleJwtException(expEx);
        } catch (UnsupportedJwtException unsEx) {
            System.out.println("UnsupportedJwtException: " + unsEx.getMessage());
            handleJwtException(unsEx);
        } catch (MalformedJwtException mjEx) {
            System.out.println("MalformedJwtException: " + mjEx.getMessage());
            handleJwtException(mjEx);
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
            handleJwtException(e);
        }
        return false;
    }

    private void handleJwtException(Exception e){
        throw new RuntimeException(e.getMessage());
    }

    public String getUsername(String token) {
        return getClaims(token).getSubject();
    }

    public String getUserRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    private Claims getClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}

