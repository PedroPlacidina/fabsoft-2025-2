package br.univille.fabsoft_backend.controller;



import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.univille.fabsoft_backend.entity.Usuario;
import br.univille.fabsoft_backend.service.UsuarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;
    
    @GetMapping
    public ResponseEntity<List<Usuario>> getUsuarios(){
        
        var listaUsuarios = service.getAll();

        return new ResponseEntity<List<Usuario>>(listaUsuarios, 
        HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Usuario> save(@Valid @RequestBody Usuario usuario, BindingResult result){
        if(usuario == null){
            return ResponseEntity.badRequest().build();
        }
        if (result.hasErrors()) {
            HttpHeaders headers = new HttpHeaders();
            String errorMessages = result.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(" "));
            headers.add("Erro", errorMessages);
            return new ResponseEntity<Usuario>(usuario, headers, HttpStatus.BAD_REQUEST);
        }
        if(usuario.getId() == null || usuario.getId() == 0){
        var usuarioSalvo = service.save(usuario);
        return new ResponseEntity<Usuario>(usuarioSalvo, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
        
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@RequestBody Usuario usuario, @PathVariable long id){
        if(id <= 0 || usuario == null){
            return ResponseEntity.badRequest().build();
        }

        try {
            usuario = service.update(id, usuario);
            return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Usuario> delete(@PathVariable long id){

        if(id <= 0){
            return ResponseEntity.badRequest().build();
        }

        try {
            var usuario = service.delete(id);
            return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

}
