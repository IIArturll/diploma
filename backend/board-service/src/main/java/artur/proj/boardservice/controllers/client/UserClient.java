package artur.proj.boardservice.controllers.client;

import artur.proj.commonclasses.entities.UserEntity;
import artur.proj.commonclasses.security.MyUserDetails;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient(value = "user-service", path = "micro/user")
public interface UserClient {
    @GetMapping("/details/{email}")
    Optional<MyUserDetails> getUserDetailsByEmail(@PathVariable String email);

    @GetMapping("/entity/{email}")
    Optional<UserEntity> getUserEntityByEmail(@PathVariable String email);
}
