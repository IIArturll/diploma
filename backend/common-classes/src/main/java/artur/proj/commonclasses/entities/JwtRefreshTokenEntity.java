package artur.proj.commonclasses.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "jwt_refresh_tokens", schema = "task_manager")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class JwtRefreshTokenEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(name= "user_email")
    private String email;
    private String token;
    @Column(name = "expiry_date")
    private Instant expiryDate;
}
