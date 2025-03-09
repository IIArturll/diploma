package artur.proj.commonclasses.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.util.UUID;

@Entity
@Table(schema = "task_manager", name = "board_user_access")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BoardUserAccessEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "board_id")
    private BoardEntity board;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    @Enumerated(EnumType.STRING)
    @Column(name = "invitation_status")
    @JdbcType(value = PostgreSQLEnumJdbcType.class)
    private InvitationStatus status=InvitationStatus.PENDING;
}
