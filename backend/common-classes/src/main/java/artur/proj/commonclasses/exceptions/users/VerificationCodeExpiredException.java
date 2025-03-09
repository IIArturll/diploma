package artur.proj.commonclasses.exceptions.users;

public class VerificationCodeExpiredException extends RuntimeException {
  public VerificationCodeExpiredException() {
    super("Verification code expired");
  }
}
