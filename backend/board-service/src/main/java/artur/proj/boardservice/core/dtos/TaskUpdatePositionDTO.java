package artur.proj.boardservice.core.dtos;

import artur.proj.commonclasses.entities.TaskStatus;

import java.util.UUID;

public record TaskUpdatePositionDTO(
    UUID id,
    Short positionY,
    TaskStatus status
) {
}
