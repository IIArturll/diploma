package artur.proj.userservice.core.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record UserLoginDTO(
    @NotNull
    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
            message = "illegal format of email,correct example: email@mail.ru , google@gmail.com")
    String email,
    @NotNull
    @NotBlank
    String password) {
}
