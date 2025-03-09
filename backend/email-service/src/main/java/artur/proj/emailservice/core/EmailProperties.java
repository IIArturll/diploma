package artur.proj.emailservice.core;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class EmailProperties {
    @Value("${email.fromAddress}")
    private String fromAddress;
    @Value("${email.subjects.verification}")
    private String subjectVerification;
    @Value("${email.subjects.invitation}")
    private String subjectInvitation;
}
