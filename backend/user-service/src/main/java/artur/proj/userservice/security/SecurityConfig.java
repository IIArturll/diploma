package artur.proj.userservice.security;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.ws.rs.HttpMethod;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JWTFilter jwtFilter;

    public SecurityConfig(JWTFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(AbstractHttpConfigurer::disable);
        http.csrf(AbstractHttpConfigurer::disable);
        http.formLogin(AbstractHttpConfigurer::disable);
        http.sessionManagement(sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.exceptionHandling((exceptionHandling) ->
                exceptionHandling.authenticationEntryPoint((
                        (request, response, authException) ->
                                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED))));
        http.exceptionHandling(exceptionHandling ->
                exceptionHandling.accessDeniedHandler((
                        (request, response, accessDeniedException) ->
                                response.setStatus(HttpServletResponse.SC_FORBIDDEN))));
        http
                .authorizeHttpRequests(auth -> auth
//                                .requestMatchers("/micro/**").access(
//                                        new WebExpressionAuthorizationManager("hasIpAddress('product-service')")) //для докера
//                                .requestMatchers("/micro/**").access(
//                                        new WebExpressionAuthorizationManager("hasIpAddress('order-service')")) //для докера
                                .requestMatchers("/micro/**").permitAll() //для тетсов на локалке
                                .requestMatchers(HttpMethod.GET, "/api/user/me").authenticated()
                                .requestMatchers(HttpMethod.POST, "/api/user/logout").authenticated()
                                .requestMatchers(HttpMethod.POST, "/api/user/registration").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/user/verify").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/user/login").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/user/refresh").permitAll()
                                .anyRequest().denyAll()
                );
        http
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
