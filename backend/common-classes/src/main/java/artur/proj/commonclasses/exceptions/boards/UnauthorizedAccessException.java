package artur.proj.commonclasses.exceptions.boards;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN) // 403 Forbidden
public class UnauthorizedAccessException extends RuntimeException {
    public UnauthorizedAccessException() {
        super("User does not have access to this board");
    }
}
