package artur.proj.userservice.controllers.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@FeignClient(value = "email-service", path = "/api/email")
public interface EmailClient {

    @PostMapping("/send/verification/{email}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    void sendVerificationEmail(@PathVariable String email);

    @GetMapping("/verification/email/{email}/code/{code}")
    @ResponseStatus(HttpStatus.OK)
    boolean verify(@PathVariable String email, @PathVariable String code);

}
