package br.univille.fabsoft_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.univille.fabsoft_backend.entity.Reserva;
import br.univille.fabsoft_backend.service.ReservaService;

@RestController
@RequestMapping("/api/v1/reservas")
public class ReservaController {

    @Autowired
    private ReservaService service;

    @GetMapping
    public ResponseEntity<List<Reserva>> getReservas(){
        
        var listaReservas = service.getAll();

        return new ResponseEntity<List<Reserva>>(listaReservas, 
        HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Reserva> save(@RequestBody Reserva reserva){
        if(reserva == null){
            return ResponseEntity.badRequest().build();
        }
        if(reserva.getId() == null || reserva.getId() == 0){
        var reservaSalva = service.save(reserva);
        return new ResponseEntity<Reserva>(reservaSalva, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reserva> update(@RequestBody Reserva reserva, @PathVariable long id){
        if(id <= 0 || reserva == null){
            return ResponseEntity.badRequest().build();
        }

        try {
            var reservaAtualizada = service.update(id, reserva);
            return new ResponseEntity<Reserva>(reservaAtualizada, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Reserva> delete(@PathVariable long id){
        if(id <= 0){
            return ResponseEntity.badRequest().build();
        }
        try {
            var reservaDeletada = service.delete(id);
            return new ResponseEntity<Reserva>(reservaDeletada, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }


}
