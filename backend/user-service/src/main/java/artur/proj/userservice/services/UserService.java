package artur.proj.userservice.services;

import artur.proj.userservice.core.dtos.AuthDTO;
import artur.proj.userservice.core.dtos.UserCreateDTO;
import artur.proj.userservice.core.dtos.UserDTO;
import artur.proj.userservice.core.dtos.UserLoginDTO;


public interface UserService {

    void register(UserCreateDTO user);

    UserDTO getMe();

    void verifyEmail(String email, String verificationCode);

    AuthDTO login(UserLoginDTO user);

    AuthDTO refreshToken(String refreshToken);

    void logout(String refreshToken);
}
