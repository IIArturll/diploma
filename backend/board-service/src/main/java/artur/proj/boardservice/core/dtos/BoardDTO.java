package artur.proj.boardservice.core.dtos;

import artur.proj.commonclasses.entities.BoardType;

import java.util.List;
import java.util.UUID;

public record BoardDTO(
        UUID id,
        String name,
        String description,
        BoardType type,
        List<TaskDTO> tasks) {
}
