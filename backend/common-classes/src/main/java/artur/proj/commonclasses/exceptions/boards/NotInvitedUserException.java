package artur.proj.commonclasses.exceptions.boards;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN) // 403 Forbidden
public class NotInvitedUserException extends RuntimeException {
    public NotInvitedUserException() {
        super("You are not the invited user for this board");
    }
}
