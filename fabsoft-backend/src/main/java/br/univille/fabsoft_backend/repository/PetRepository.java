package br.univille.fabsoft_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univille.fabsoft_backend.entity.Pet;

@Repository
public interface PetRepository 
    extends JpaRepository<Pet,Long>{
        List<Pet> findByUsuarioId(Long usuarioId);  
        List<Pet> findByRacaContaining(String raca);

}
