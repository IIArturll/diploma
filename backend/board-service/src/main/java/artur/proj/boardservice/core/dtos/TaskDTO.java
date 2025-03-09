package artur.proj.boardservice.core.dtos;

import artur.proj.commonclasses.entities.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

public record TaskDTO(
        UUID id,
        @NotNull
        @NotBlank
        String description,
        UserDTO owner,
        UserDTO executor,
        Timestamp createdAt,
        Timestamp startedAt,
        Timestamp endedAt,
        Long executeTime,
        TaskStatus status,
        Short positionY,
        List<TagDTO> tags
) {
}
