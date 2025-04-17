package artur.proj.boardservice.services;

import artur.proj.boardservice.core.dtos.*;

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

    void updatePositions(UUID boardId, List<TaskUpdatePositionDTO> list);

    void becomeExecutor(UUID boardId,UUID taskId);

    void deleteExecutor(UUID boardId, UUID taskId);
}
