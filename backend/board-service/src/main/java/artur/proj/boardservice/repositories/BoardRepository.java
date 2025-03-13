package artur.proj.boardservice.repositories;

import artur.proj.boardservice.core.dtos.BoardNameDTO;
import artur.proj.commonclasses.entities.BoardEntity;
import artur.proj.commonclasses.entities.UserEntity;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BoardRepository extends CrudRepository<BoardEntity, UUID> {

}
