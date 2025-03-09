package artur.proj.boardservice.security;

import artur.proj.commonclasses.security.JWTTokenUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {
    @Bean
    public JWTTokenUtil jwtTokenUtil() {
        return new JWTTokenUtil();
    }
}
