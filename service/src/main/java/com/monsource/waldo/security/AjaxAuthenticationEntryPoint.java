package com.monsource.waldo.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.monsource.waldo.dto.Result;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by nasanjargal on 5/24/2015.
 */
@Service
public class AjaxAuthenticationEntryPoint implements AuthenticationEntryPoint, AuthenticationFailureHandler {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {

        System.err.println("[COMMENCE] "+request.getRequestURI());
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        Result result = new Result(false, "Нэвтрээгүй байна");
        OBJECT_MAPPER.writeValue(response.getWriter(), result);
//        e.printStackTrace();
    }

    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {

        System.err.println("[AUTH FAILURE] "+request.getRequestURI());
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        Result result = new Result(false, "Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!!");
        OBJECT_MAPPER.writeValue(response.getWriter(), result);
//        e.printStackTrace();
    }
}
