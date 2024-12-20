package com.example.studentManagementSystemBackend.configuration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class FilterChainConfiguration extends OncePerRequestFilter {

    AuthenticationProvider authenticationProvider;

    FilterChainConfiguration(AuthenticationProvider authenticationProvider){
        this.authenticationProvider = authenticationProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Cookie cookies[] = request.getCookies();

        String token = null;

        if(cookies!=null){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals("jwt")){
                    token = cookie.getValue();
                }
            }
        }


        if(token != null && SecurityContextHolder.getContext().getAuthentication()==null){
              SecurityContextHolder.getContext().setAuthentication(authenticationProvider.validToken(token));
        }

        filterChain.doFilter(request,response);
    }


}
