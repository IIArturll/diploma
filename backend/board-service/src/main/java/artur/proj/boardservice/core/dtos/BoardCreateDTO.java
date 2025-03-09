package artur.proj.boardservice.core.dtos;

import artur.proj.commonclasses.entities.BoardType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BoardCreateDTO(
        @NotNull
        @NotBlank
        String name,
        String description,
        @NotNull
        BoardType type
) {
}
