package artur.proj.userservice.controllers;

import artur.proj.userservice.core.dtos.AuthDTO;
import artur.proj.userservice.core.dtos.UserCreateDTO;
import artur.proj.userservice.core.dtos.UserDTO;
import artur.proj.userservice.core.dtos.UserLoginDTO;
import artur.proj.userservice.services.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/registration")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody @Valid UserCreateDTO user) {
        userService.register(user);
    }

    @PostMapping("/verify")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void verify(@RequestParam("email")
                       @Pattern(regexp = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
                               message = "illegal format of email,correct example: email@mail.ru , google@gmail.com")
                       @Valid
                       String email,
                       @RequestParam("code") String code) {
        userService.verifyEmail(email, code);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AuthDTO login(@RequestBody @Valid UserLoginDTO user) {
        return userService.login(user);
    }

    @PostMapping("/refresh")
    @ResponseStatus(HttpStatus.OK)
    public AuthDTO refresh(@RequestParam("refreshToken") String refreshToken) {
        return userService.refreshToken(refreshToken);
    }

    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO getMe() {
        return userService.getMe();
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public void logout(@RequestParam("refreshToken") String refreshToken) {
        userService.logout(refreshToken);
    }
}
