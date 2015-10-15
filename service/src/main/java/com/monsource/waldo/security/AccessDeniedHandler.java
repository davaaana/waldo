package com.monsource.waldo.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.monsource.waldo.dto.Result;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by nasanjargal on 5/24/2015.
 */
@Service
public class AccessDeniedHandler implements org.springframework.security.web.access.AccessDeniedHandler {

    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

        ObjectMapper objectMapper = new ObjectMapper();

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        Result result = new Result(false,"Access is denied");
        objectMapper.writeValue(response.getWriter(), result);
    }
}
