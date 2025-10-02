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

import br.univille.fabsoft_backend.entity.Servico;
import br.univille.fabsoft_backend.service.ServicoService;

@RestController
@RequestMapping("/api/v1/servicos")
public class ServicoController {

    @Autowired
    private ServicoService service;

    @GetMapping
    public ResponseEntity<List<Servico>> getServicos(){

        var listaServicos = service.getAll();

        return new ResponseEntity<List<Servico>>(listaServicos, 
        HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Servico> save(@RequestBody Servico servico){
        if(servico == null){
            return ResponseEntity.badRequest().build();
        }
        if(servico.getId() == null || servico.getId() == 0){
        var servicoSalvo = service.save(servico);
        return new ResponseEntity<Servico>(servicoSalvo, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> update(@RequestBody Servico servico, @PathVariable long id){
        if(id <= 0 || servico == null){
            return ResponseEntity.badRequest().build();
        }

        try {
            var servicoAtualizado = service.update(id, servico);
            return new ResponseEntity<Servico>(servicoAtualizado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Servico> delete(@PathVariable long id){
        if (id <= 0) {
            return ResponseEntity.badRequest().build();           
        }
        try {
            var servicoDeletado = service.delete(id);
            return new ResponseEntity<Servico>(servicoDeletado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

}
