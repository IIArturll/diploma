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
    @Query("select new artur.proj.boardservice.core.dtos.BoardNameDTO(b.id ,b.name) from BoardEntity b where b.owner = :owner")
    List<BoardNameDTO> findALlBoardNameByOwner(@Param("owner") UserEntity owner);

    @Query(value = """
    SELECT new artur.proj.boardservice.core.dtos.BoardNameDTO(b.id, b.name) 
    FROM BoardUserAccessEntity bua
    JOIN BoardEntity b ON b = bua.board
    WHERE (b.owner = :user
    OR (bua.user = :user AND bua.status = 'ACCEPTED'))
    """)
    List<BoardNameDTO> findAllBoardNamesByUser(@Param("user") UserEntity user);
}
