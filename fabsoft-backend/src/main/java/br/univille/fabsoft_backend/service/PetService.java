package br.univille.fabsoft_backend.service;

import java.util.List;

import br.univille.fabsoft_backend.entity.Pet;

public interface PetService {
    List<Pet> getAll();
    Pet save(Pet pet);
    Pet update(Long id, Pet pet) throws Exception;
    Pet delete(Long id) throws Exception;
}
