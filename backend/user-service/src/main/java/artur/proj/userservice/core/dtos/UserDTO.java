package artur.proj.userservice.core.dtos;

import artur.proj.commonclasses.entities.UserStatus;

public record UserDTO(
        String username,
        String email,
        UserStatus status) {
}
