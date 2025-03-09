package artur.proj.commonclasses.exceptions.boards;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST) // 400 Bad Request
public class InviteAlreadyRespondedException extends RuntimeException {
    public InviteAlreadyRespondedException() {
        super("You have already responded to this invite");
    }
}
