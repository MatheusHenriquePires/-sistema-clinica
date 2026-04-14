package com.example.demo.exception;

public class ErroResposta {
    private int status;
    private String error;
    private String mensagem;



    public ErroResposta(int status,String error, String mensagem){
        this.status = status;
        this.error = error;
        this.mensagem = mensagem;
    }


    //getters
    public int getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }

    public String getMensagem() {
        return mensagem;
    }

}
