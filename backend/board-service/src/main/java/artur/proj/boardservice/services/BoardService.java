package artur.proj.boardservice.services;

import artur.proj.boardservice.core.dtos.BoardCreateDTO;
import artur.proj.boardservice.core.dtos.BoardDTO;
import artur.proj.boardservice.core.dtos.BoardNameDTO;
import artur.proj.boardservice.core.dtos.TaskDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

public interface BoardService {

    void create(BoardCreateDTO dto);

    BoardDTO getById(UUID id);

    List<BoardNameDTO> getAllNamesOfBoard();

    void update(BoardDTO dto);

    void addTask(UUID boardId, TaskDTO dto);

    void removeTask(UUID boardId, UUID taskId);

    void delete(UUID id);
}
