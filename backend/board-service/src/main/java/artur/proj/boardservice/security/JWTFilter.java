package artur.proj.boardservice.security;

import artur.proj.boardservice.controllers.client.UserClient;
import artur.proj.boardservice.core.mappers.Mappers;
import artur.proj.commonclasses.security.JWTTokenUtil;
import ch.qos.logback.core.util.StringUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JWTFilter extends OncePerRequestFilter {
    private final JWTTokenUtil tokenUtil;
    private final UserClient client;
    private final Mappers mapper;

    public JWTFilter(JWTTokenUtil tokenUtil, UserClient client, Mappers mapper) {
        this.tokenUtil = tokenUtil;
        this.client = client;
        this.mapper = mapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtil.isNullOrEmpty(header) || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        final String token = header.split(" ")[1].trim();
        if (!tokenUtil.validateToken(token)) {
            filterChain.doFilter(request, response);
            return;
        }
        UserDetails userDetails = mapper.toMyUserDetails(client.getUserEntityByEmail(tokenUtil.getUsername(token))
                .orElseThrow(()-> new RuntimeException("User not found")));
        UsernamePasswordAuthenticationToken
                authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null,
                userDetails == null ?
                        List.of() : userDetails.getAuthorities()
        );
        authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }
}
