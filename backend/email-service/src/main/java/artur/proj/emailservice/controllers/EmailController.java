package artur.proj.emailservice.controllers;

import artur.proj.emailservice.services.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send/verification/{email}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void sendVerificationEmail(@PathVariable String email) {
        emailService.sendVerification(email);
    }

    @GetMapping("/verification/email/{email}/code/{code}")
    @ResponseStatus(HttpStatus.OK)
    public boolean verify(@PathVariable String email, @PathVariable String code) {
        return emailService.verify(email, code);
    }

    @PostMapping("/send/invite/{email}/{code}/{boardName}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void sendInviteEmail(@PathVariable String email,@PathVariable String code,@PathVariable String boardName) {
        emailService.sendInvite(email, code, boardName);
    }
}
