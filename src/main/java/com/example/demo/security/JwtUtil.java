package com.example.demo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

   private final String SECRET = "clinica-secreta-super-segura-2025-abc123xyz";

   private final long EXPIRACAO = 8640000; // 24 horas

   private SecretKey getChave(){
         return Keys.hmacShaKeyFor(SECRET.getBytes());
   }


   public String gerarToken(String email){
     return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRACAO))
                .signWith(getChave())
                .compact();
                
   }

   public String extrairEmail(String token) {
        return Jwts.parser()
                .verifyWith(getChave())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

   public boolean tokenValido(String token){
    try{
        extrairEmail(token);
        return true;
    } catch (Exception e){
        return false;
      }
   }   
}