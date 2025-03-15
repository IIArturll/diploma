package artur.proj.userservice.controllers;

import artur.proj.commonclasses.entities.UserEntity;
import artur.proj.commonclasses.security.MyUserDetails;
import artur.proj.userservice.security.MyUserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
@RequestMapping("/micro/user")
public class UserMicroController {
    private final MyUserDetailsService myUserDetailsService;

    public UserMicroController(MyUserDetailsService myUserDetailsService) {
        this.myUserDetailsService = myUserDetailsService;
    }

    @GetMapping("/details/{email}")
    public MyUserDetails getUserByEmail(@PathVariable("email") String email) {
        return myUserDetailsService.loadUserByUsername(email);
    }

    @GetMapping("/entity/{email}")
    public Optional<UserEntity> getEntityByEmail(@PathVariable("email") String email){
        Optional<UserEntity> userByEmail = myUserDetailsService.findUserByEmail(email);
        return userByEmail;
    }
}
