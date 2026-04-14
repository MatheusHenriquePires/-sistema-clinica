package com.example.demo.service;

import com.example.demo.model.Paciente;
import com.example.demo.repositories.PacienteRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PacienteService {
 


    private final PacienteRepository repository;
   
public PacienteService(PacienteRepository repository){
    this.repository = repository;
}

public Paciente cadastrar (Paciente paciente){
      // Lógica de validação
      
      // *1 - verifica o nome do paciente
      if (paciente.getNome() == null || paciente.getNome().isBlank()){
      throw new RuntimeException("Nome do paciente é obrigatório");
   }

   if (paciente.getCpf() == null || paciente.getCpf().isBlank()){
        throw new RuntimeException("CPF do paciente é obrigatório");
   }

             boolean cpfExiste = repository.findAll()
                 .stream()
                 .anyMatch(p -> p.getCpf().equals(paciente.getCpf()));

    if (cpfExiste){
        throw new RuntimeException("CPF do paciente já cadastrado");
    }

    return repository.save(paciente);

   }

     // listar todos os pacientes
     public List<Paciente> listarTodos(){
        return repository.findAll();
     }

        //buscar paciente por id
      public Paciente buscarPorId(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado " ));
      }

      //excluir paciente por 
      public void deletar (Long id){
        buscarPorId(id);
        repository.deleteById(id);
      }
}