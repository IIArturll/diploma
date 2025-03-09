package artur.proj.commonclasses.exceptions.users;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST) // 400 Bad Request
public class InvalidEmailFormatException extends RuntimeException {
    public InvalidEmailFormatException(String email) {
        super("Incorrect format of email: " + email);
    }
}

