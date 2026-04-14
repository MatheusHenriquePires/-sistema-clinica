// package com.example.demo.repositories;

// import com.example.demo.model.Consulta;
// import org.springframework.stereotype.Repository;

// import java.util.ArrayList;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;

// @Repository
// public class ConsultaRepository {
//     private Map<Long, Consulta> database = new HashMap<>();
//     private Long proximoId = 1L;

//     public Consulta save(Consulta consulta){
//         consulta.setId(proximoId);
//         database.put(proximoId, consulta);
//         proximoId++;
//         return consulta;
//     }

//     public Optional<Consulta> buscarPorId(Long id){
//         return Optional.ofNullable(database.get(id));
//     }

//     public List<Consulta> listarTodos(){
//         return new ArrayList<>(database.values());
//     }

//     public void deletar(Long id){
//         database.remove(id);
//     }

// }
package com.example.demo.repositories;

import com.example.demo.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
}
