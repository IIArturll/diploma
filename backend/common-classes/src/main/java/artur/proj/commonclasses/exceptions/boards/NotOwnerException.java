package artur.proj.commonclasses.exceptions.boards;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN) // 403 Forbidden
public class NotOwnerException extends RuntimeException {
    public NotOwnerException() {
        super("You are not the owner of this board");
    }
}

