package artur.proj.commonclasses.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(schema = "task_manager", name = "user_verification")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserVerificationEntity {
    @Id
    private String email;
    private String code;
    @Column(name = "expiry_date")
    private Instant expiryDate;
}
