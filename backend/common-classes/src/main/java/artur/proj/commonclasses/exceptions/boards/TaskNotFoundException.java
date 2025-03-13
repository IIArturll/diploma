package artur.proj.commonclasses.exceptions.boards;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.UUID;

@ResponseStatus(HttpStatus.NOT_FOUND) // 404 Not Found
public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(UUID boardId) {
        super("No task with id: " + boardId);
    }
}
