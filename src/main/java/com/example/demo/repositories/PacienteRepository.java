package com.example.demo.repositories;

import com.example.demo.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PacienteRepository extends JpaRepository<Paciente, Long> {

       

}