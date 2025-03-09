package artur.proj.boardservice.core.dtos;


import artur.proj.commonclasses.entities.UserStatus;

public record UserDTO(
        String username,
        String email,
        UserStatus status) {
}
