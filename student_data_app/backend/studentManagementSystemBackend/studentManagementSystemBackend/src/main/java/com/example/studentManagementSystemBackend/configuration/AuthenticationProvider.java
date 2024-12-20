package com.example.studentManagementSystemBackend.configuration;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import com.auth0.jwt.JWTVerifier;


@Component
public class AuthenticationProvider {

    private String secret = "kunfupandapokemonoptimusprime";

    protected void makeSecretEncrpted(){
        secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    public String createToken(){
        Date now = new Date();
        Date Validity = new Date(now.getTime()+604800000);

       return JWT.create().withIssuedAt(now).withExpiresAt(Validity).withIssuer("tailungkunfupanda").sign(Algorithm.HMAC256(secret));
    }

    public Authentication validToken(String token){
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(secret)).build();

        DecodedJWT decodedJWT = jwtVerifier.verify(token);

        String issuer  = decodedJWT.getIssuer();
        System.out.println("ISSUER "+issuer);
        if(issuer.equals("tailungkunfupanda")){
            return new UsernamePasswordAuthenticationToken(null,null, Collections.emptyList());
        }else{
            throw new RuntimeException("USER UNAUTHORIZED");
        }
    }

}
