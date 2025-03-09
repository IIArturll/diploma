package artur.proj.commonclasses.entities;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.util.List;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(schema = "task_manager", name = "users")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String username;
    @NotBlank
    @Column(unique = true)
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@(.+)$",
            message = "illegal format of email,correct example: email@mail.ru , google@gmail.com")
    private String email;
    @NotBlank
    private String password;
    @Enumerated(EnumType.STRING)
    @JdbcType(value = PostgreSQLEnumJdbcType.class)
    private UserStatus status = UserStatus.WAITING_ACTIVATION;
    @ManyToMany
    @JoinTable(schema = "task_manager", name = "user_boards",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "board_id"))
    private List<BoardEntity> boards;
    @OneToMany(mappedBy = "user")
    private List<BoardUserAccessEntity> boardUserAccesses;

}
