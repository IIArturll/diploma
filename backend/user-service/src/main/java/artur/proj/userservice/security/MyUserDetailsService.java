package artur.proj.userservice.security;

import artur.proj.commonclasses.entities.UserEntity;
import artur.proj.commonclasses.security.MyUserDetails;
import artur.proj.userservice.core.mappers.UserMapper;
import artur.proj.userservice.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public MyUserDetailsService(UserMapper mapper, UserRepository userRepository) {
        this.userMapper = mapper;
        this.userRepository = userRepository;
    }

    @Override
    public MyUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        MyUserDetails userNotFound = userMapper.toMyUserDetailsService(userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found")));
        return userNotFound;
    }

    public Optional<UserEntity> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
