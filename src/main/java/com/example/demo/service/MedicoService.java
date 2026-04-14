package com.example.demo.service;

import com.example.demo.model.Medico;
import com.example.demo.repositories.MedicoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MedicoService {
     private final MedicoRepository repository;

     public MedicoService(MedicoRepository repository){
        this.repository = repository;
     }

     public Medico cadastrar (Medico medico){
        // Lógica de validação
        
        // *1 - verifica o nome do medico
        if (medico.getNome() == null || medico.getNome().isBlank()){
        throw new RuntimeException("Nome do medico é obrigatório");
        }
 
        if (medico.getCrm() == null || medico.getCrm().isBlank()){
             throw new RuntimeException("CRM do medico é obrigatório");
        }
 
                  boolean crmExiste = repository.findAll()
                      .stream()
                      .anyMatch(m -> m.getCrm().equals(medico.getCrm()));
 
         if (crmExiste){
             throw new RuntimeException("CRM do medico já cadastrado");
         }
 
         return repository.save(medico);  

}

 
        // listar todos os medicos
        public List<Medico> listarTodos(){
             return repository.findAll();
        }
    
             //buscar medico por id
         public Medico buscarPorId(Long id){
             return repository.findById(id)
                     .orElseThrow(() -> new RuntimeException("Medico não encontrado " ));
         }
    
         //excluir medico por 
         public void deletar (Long id){
             buscarPorId(id);
             repository.deleteById(id);
         }
    }
