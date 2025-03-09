package artur.proj.emailservice.services;


public interface EmailService {
    void sendVerification(String recipient);

    boolean verify(String recipient, String code);

    void sendInvite(String email, String code, String boardName);

}
