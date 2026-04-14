package com.example.demo.model;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity 
public class Consulta {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Long pacienteId;   
    private Long medicoId;    
    private LocalDateTime dataHora; 
    private String motivo;
    
    public Consulta(){}

    public Consulta(Long id, Long pacienteId, Long MedicoId, LocalDateTime dataHora, String motivo){
        this.id = id;
        this.pacienteId = pacienteId;
        this.medicoId = MedicoId;
        this.dataHora = dataHora;
        this.motivo = motivo;
        }


           public Long getId() { return id; }
           public void setId(Long id) { this.id = id; }

           public Long getPacienteId() { return pacienteId; }
           public void setPacienteId(Long pacienteId) { this.pacienteId = pacienteId; }

           public Long getMedicoId() { return medicoId; }
           public void setMedicoId(Long medicoId) { this.medicoId = medicoId; }

           public LocalDateTime getDataHora() { return dataHora; }
           public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }

           public String getMotivo() { return motivo; }
           public void setMotivo(String motivo) { this.motivo = motivo; }
}

