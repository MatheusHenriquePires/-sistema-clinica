package com.example.demo.controller;

import com.example.demo.model.Paciente;
import com.example.demo.service.PacienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/pacientes")
public class PacienteController {
      
    private final PacienteService service;

    public PacienteController(PacienteService service){
    this.service = service;
    }
   
    //cadastrar um novo paciente
    @PostMapping
    public ResponseEntity<Paciente> cadastrar(@RequestBody Paciente paciente){
        Paciente salvo = service.cadastrar(paciente);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }



    //listar todos os pacientes 
    @GetMapping
    public ResponseEntity<List<Paciente>> listarTodos(){
        return ResponseEntity.ok(service.listarTodos());
    }


     // buscar paciente por id

     @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id)); // 200
    }



    //deletar paciente por id
     @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build(); // 204
    }


}
