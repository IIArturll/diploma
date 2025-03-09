package artur.proj.commonclasses.exceptions.users;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // 404 Not Found
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String email) {
        super("User with this email: " + email + " not found");
    }
}
