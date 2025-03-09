package artur.proj.boardservice.repositories;

import artur.proj.commonclasses.entities.TagEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends CrudRepository<TagEntity, Short> {
    Optional<TagEntity> findByTag(String tag);
    List<TagEntity> findAll();
}
