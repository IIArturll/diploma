package artur.proj.userservice.core.dtos;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserCreateDTO(
        @NotNull
        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
                message = "illegal format of email,correct example: email@mail.ru , google@gmail.com")
        String email,
        @NotNull
        @NotBlank
        String username,
        @NotNull
        @NotBlank
        @Size(min = 8)
        String password
) {
}
