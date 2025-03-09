package artur.proj.boardservice.controllers.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@FeignClient(value = "email-service", path = "/api/email")
public interface EmailClient {
    @PostMapping("/send/invite/{email}/{code}/{boardName}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    void sendInviteEmail(@PathVariable String email, @PathVariable String code, @PathVariable String boardName);
}
