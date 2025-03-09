package artur.proj.boardservice.repositories;

import artur.proj.commonclasses.entities.BoardEntity;
import artur.proj.commonclasses.entities.BoardUserAccessEntity;
import artur.proj.commonclasses.entities.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BoardUserAccessRepository extends CrudRepository<BoardUserAccessEntity, UUID> {
    BoardUserAccessEntity findByBoardAndUser(BoardEntity board, UserEntity user);
}
