package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.demo.service.MedicoService;  // ← o mais importante!
import java.util.List;


import com.example.demo.model.Medico;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    private final MedicoService service;

    public MedicoController(MedicoService service){
        this.service = service;
    }
        //cadastrar um novo medico
    @PostMapping
    public ResponseEntity<Medico> cadastrar(@RequestBody Medico medico){
        Medico salvo = service.cadastrar(medico);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }


    @GetMapping
    public ResponseEntity<List<Medico>> listarTodos(){
        return ResponseEntity.ok(service.listarTodos());
    }

        // buscar medico por id
    
        @GetMapping("/{id}")
    public ResponseEntity<Medico> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id)); // 200   
    }

     //deletar medico por id
     @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build(); // 204
    }

}
