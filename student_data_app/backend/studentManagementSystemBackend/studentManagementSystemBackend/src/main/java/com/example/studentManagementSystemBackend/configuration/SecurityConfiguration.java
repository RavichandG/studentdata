package com.example.studentManagementSystemBackend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
   private AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity)throws Exception{
     return httpSecurity.csrf(csrf->csrf.disable())
                .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new FilterChainConfiguration(authenticationProvider), BasicAuthenticationFilter.class)
                .authorizeHttpRequests(auth->auth.requestMatchers("/student").permitAll()
                        .requestMatchers("/student/get").authenticated()
                        .requestMatchers("/student/update").authenticated()
                        .requestMatchers("/student/delete/{id}").authenticated()
                        .requestMatchers("/student/delete").authenticated()
                        .requestMatchers("/student/get/{id}").authenticated()
                        .requestMatchers("/login").permitAll()
                        .requestMatchers("/login/change").permitAll()
                           .requestMatchers("/check").permitAll()).build();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
