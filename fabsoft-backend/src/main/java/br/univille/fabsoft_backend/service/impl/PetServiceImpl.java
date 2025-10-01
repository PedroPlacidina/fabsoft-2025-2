package br.univille.fabsoft_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Pet;
import br.univille.fabsoft_backend.repository.PetRepository;
import br.univille.fabsoft_backend.service.PetService;

@Service
public class PetServiceImpl implements PetService{

    @Autowired
    private PetRepository repository;

    @Override
    public List<Pet> getAll() {
        return repository.findAll();
    }

    @Override
    public Pet save(Pet pet) {
        return repository.save(pet);
    }

    @Override
    public Pet update(Long id, Pet pet) throws Exception {
        var petAntigo = repository.findById(id)
            .orElseThrow( () -> new IllegalArgumentException("Pet nao encontrado com ID :" + id));
        
        petAntigo.setNome(pet.getNome());
        petAntigo.setRaca(pet.getRaca());
        petAntigo.setIdade(pet.getIdade());
        petAntigo.setPeso(pet.getPeso());

        return repository.save(petAntigo);

    }

    @Override
    public Pet delete(Long id) throws Exception {
        var petAntigo = repository.findById(id)
            .orElseThrow( () -> new IllegalArgumentException("Pet nao encontrado com ID :" + id));
        
        repository.delete(petAntigo);
        return petAntigo;
    }
}
