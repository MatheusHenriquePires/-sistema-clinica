package com.example.demo.service;

import com.example.demo.model.Consulta;
import com.example.demo.repositories.ConsultaRepository;
import com.example.demo.repositories.MedicoRepository;
import com.example.demo.repositories.PacienteRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ConsultaService {

    private final ConsultaRepository consultaRepository;
    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;

    public ConsultaService(ConsultaRepository consultaRepository,
                           MedicoRepository medicoRepository,
                           PacienteRepository pacienteRepository) {
        this.consultaRepository = consultaRepository;
        this.medicoRepository = medicoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public Consulta agendar(Consulta consulta) {
        if (consulta.getMotivo() == null || consulta.getMotivo().isBlank())
            throw new RuntimeException("O motivo da consulta é obrigatório.");

        if (consulta.getDataHora() == null)
            throw new RuntimeException("A data e hora da consulta são obrigatórias.");

        pacienteRepository.findById(consulta.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado."));

        medicoRepository.findById(consulta.getMedicoId())
                .orElseThrow(() -> new RuntimeException("Médico não encontrado."));

        return consultaRepository.save(consulta);
    }

    public List<Consulta> listarConsultas() {
        return consultaRepository.findAll();
    }

    
    public Consulta buscarPorId(Long id) {
        return consultaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada."));
    }

    public void cancelar(Long id) {
        buscarPorId(id); 
        consultaRepository.deleteById(id);
    }
}