package artur.proj.commonclasses.exceptions.users;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST) // 400 Bad Request
public class UserNotWaitingActivationException extends RuntimeException {
    public UserNotWaitingActivationException(String email) {
        super("User with this email: " + email + ", is not waiting activation");
    }
}
