
package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {

    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErroResposta> handleIllegalArgument(IllegalArgumentException ex) {
        ErroResposta erro = new ErroResposta(
            400,
            "Requisição inválida",
            ex.getMessage()  
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErroResposta> handleRuntimeException(RuntimeException ex) {
        ErroResposta erro = new ErroResposta(
            404,
            "Recurso não encontrado",
            ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroResposta> handleException(Exception ex) {
        ErroResposta erro = new ErroResposta(
            500,
            "Erro interno do servidor",
            "Algo deu errado. Tente novamente."
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
    }
}