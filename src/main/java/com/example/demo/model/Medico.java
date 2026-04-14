package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
 import jakarta.persistence.Id;

@Entity
public class Medico {



    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String especialidade;
    private String crm;
    private String email;


    public Medico(){}

    public Medico(Long id, String nome, String especialidade, String crm, String email){
        this.id = id;
        this.nome = nome;
        this.especialidade = especialidade;
        this.crm = crm;
        this.email = email;
    }

    
  public Long getId() {return id;}
  public void setId(Long id){this.id = id;}

  public String getNome(){return nome;}
  public void setNome(String nome){this.nome = nome;}

  public String getEspecialidade(){return especialidade;}
  public void setEspecialidade(String especialidade){this.especialidade = especialidade;}

  public String getCrm(){return crm;}
  public void setCrm(String crm){this.crm = crm;}

  public String getEmail(){return email;}
  public void setEmail(String email){this.email = email;}

}
