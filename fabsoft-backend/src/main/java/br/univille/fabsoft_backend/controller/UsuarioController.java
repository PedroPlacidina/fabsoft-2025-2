package br.univille.fabsoft_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.univille.fabsoft_backend.entity.Usuario;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {
    
    @GetMapping
    public ResponseEntity<List<Usuario>> getUsuarios(){
        
        return null;
    }
}
