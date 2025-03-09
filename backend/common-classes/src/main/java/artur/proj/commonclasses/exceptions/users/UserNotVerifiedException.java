package artur.proj.commonclasses.exceptions.users;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN) // 403 Forbidden
public class UserNotVerifiedException extends RuntimeException {
    public UserNotVerifiedException(String email) {
        super("Authorization is not available, the account is not verified: " + email);
    }
}
