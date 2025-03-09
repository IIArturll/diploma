package artur.proj.commonclasses.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity
@Table(schema = "task_manager", name = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String description;
    @ManyToOne
    private UserEntity owner;
    @ManyToOne
    private UserEntity executor;
    @Column(name="created_at")
    @CreationTimestamp
    private Timestamp createdAt;
    @Column(name="start_at")
    private Timestamp startedAt;
    @Column(name = "end_at")
    private Timestamp endedAt;
    @Column(name = "execute_time")
    private Long executeTime;
    @Enumerated(EnumType.STRING)
    @JdbcType(value = PostgreSQLEnumJdbcType.class)
    private TaskStatus status=TaskStatus.PENDING;
    @Column(name = "position_y")
    private Short positionY=0;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(schema = "task_manager", name="task_tags_link",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<TagEntity> tags;
}
