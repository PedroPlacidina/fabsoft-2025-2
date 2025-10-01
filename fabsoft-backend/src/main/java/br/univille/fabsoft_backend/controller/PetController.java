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

import br.univille.fabsoft_backend.entity.Pet;
import br.univille.fabsoft_backend.service.PetService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/pets")
public class PetController {

    @Autowired
    private PetService service;

    @GetMapping
    public ResponseEntity<List<Pet>> getAll(){
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Pet> save(@Valid @RequestBody Pet pet, BindingResult result){
        if (pet == null) {
            return ResponseEntity.badRequest().build();
        }
        if (result.hasErrors()) {
            HttpHeaders headers = new HttpHeaders();
            String errorMessages = result.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(" "));
            headers.add("Erro", errorMessages);
            return new ResponseEntity<Pet>(pet, headers, HttpStatus.BAD_REQUEST);
        }
        if (pet.getId() == null || pet.getId() == 0) {
            var petSalvo = service.save(pet);
            return new ResponseEntity<Pet>(petSalvo, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();

    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> update(@RequestBody Pet pet, @PathVariable long id){
        if(id <= 0 || pet == null){
            return ResponseEntity.badRequest().build();
        }
        try {
            var petAtualizado = service.update(id, pet);
            return new ResponseEntity<Pet>(petAtualizado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Pet> delete(@PathVariable long id){
        if(id <= 0){
            return ResponseEntity.badRequest().build();
        }
        try {
            var petDeletado = service.delete(id);
            return new ResponseEntity<Pet>(petDeletado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
}
