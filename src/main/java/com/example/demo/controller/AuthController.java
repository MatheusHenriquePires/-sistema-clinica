package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.repositories.UsuarioRepository;
import com.example.demo.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {


    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioRepository repository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody Usuario usuario) {
        if (repository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email já registrado");
        }

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        repository.save(usuario);
        return ResponseEntity.ok("Usuário registrado com sucesso");
    }

   
     @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        return repository.findByEmail(usuario.getEmail())
                .filter(u -> passwordEncoder.matches(usuario.getSenha(), u.getSenha()))
                .map(u -> ResponseEntity.ok(Map.of("token", jwtUtil.gerarToken(u.getEmail()))))
                .orElse(ResponseEntity.status(401).build());
    }

}