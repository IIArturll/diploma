package artur.proj.commonclasses.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "task_manager", name = "task_tags")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TagEntity {
    @Id
    @GeneratedValue(generator = "tag_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "tag_seq", sequenceName ="task_tags_id_seq",
    schema = "task_manager", allocationSize = 1)
    private Short id;
    private String tag;
}
