package artur.proj.emailservice.services.impl;

import artur.proj.commonclasses.entities.UserVerificationEntity;
import artur.proj.commonclasses.exceptions.users.UserNotFoundException;
import artur.proj.commonclasses.exceptions.users.VerificationCodeExpiredException;
import artur.proj.emailservice.core.EmailProperties;
import artur.proj.emailservice.repositories.VerificationRepository;
import artur.proj.emailservice.services.EmailService;
import jakarta.transaction.Transactional;
import org.jobrunr.jobs.annotations.Job;
import org.jobrunr.scheduling.BackgroundJob;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Service
@Transactional
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender emailSender;
    private final VerificationRepository verificationRepository;
    private final EmailProperties emailProperties;

    public EmailServiceImpl(JavaMailSender emailSender, VerificationRepository verificationRepository,
                            EmailProperties emailProperties) {
        this.emailSender = emailSender;
        this.verificationRepository = verificationRepository;
        this.emailProperties = emailProperties;
    }

    @Override
    public void sendVerification(String recipient) {
        String code = UUID.randomUUID().toString();
        verificationRepository.save(new UserVerificationEntity(recipient, code, Instant.now().plusSeconds(24*60*60)));
        BackgroundJob.enqueue(() -> sendVerificationCode(recipient, code));
    }

    @Override
    public boolean verify(String recipient, String code) {
        UserVerificationEntity entity = verificationRepository.findById(recipient).orElseThrow(
                () -> new UserNotFoundException(recipient));
        if(entity.getExpiryDate().isAfter(Instant.now())) {
            throw new VerificationCodeExpiredException();
        }
        return Objects.equals(entity.getCode(), code);
    }

    @Override
    public void sendInvite(String email, String code, String boardName) {
        BackgroundJob.enqueue(() -> sendInviteCode(email,code, boardName));

    }

    @Job(name = "sendVerificationCode", retries = 5)
    public void sendVerificationCode(String recipient, String code) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(emailProperties.getFromAddress());
        simpleMailMessage.setTo(recipient);
        simpleMailMessage.setSubject(emailProperties.getSubjectVerification());
        simpleMailMessage.setText(String.format("Your verification code is : %s",
                code));
        emailSender.send(simpleMailMessage);
    }

    @Job(name = "sendInviteCode", retries = 5)
    public void sendInviteCode(String recipient, String code, String board) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(emailProperties.getFromAddress());
        simpleMailMessage.setTo(recipient);
        simpleMailMessage.setSubject(emailProperties.getSubjectInvitation());
        simpleMailMessage.setText(String.format("Your was invite to board: %s\n To respond, follow the link: \n192.168.100.3:8080/api/board/invite/%s",
                board, code));
        emailSender.send(simpleMailMessage);
    }

}
