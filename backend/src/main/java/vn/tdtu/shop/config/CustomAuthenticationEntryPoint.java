package vn.tdtu.shop.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import vn.tdtu.shop.util.response.RestResponse;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final BearerTokenAuthenticationEntryPoint delegate = new BearerTokenAuthenticationEntryPoint();
    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) 
            throws IOException, ServletException {
        delegate.commence(request, response, authException);
        response.setContentType("application/json;charset=UTF-8");

        RestResponse<Object> restResponse = new RestResponse<>();
        restResponse.setStatusCode(HttpStatus.UNAUTHORIZED.value());
        restResponse.setError(authException.getCause() != null ? authException.getCause().getMessage() : authException.getMessage());
        restResponse.setMessage("Token không hợp lệ!");

        objectMapper.writeValue(response.getWriter(), restResponse);
    }
}