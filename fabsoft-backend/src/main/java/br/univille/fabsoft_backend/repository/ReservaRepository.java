package br.univille.fabsoft_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univille.fabsoft_backend.entity.Reserva;

@Repository
public interface ReservaRepository 
    extends JpaRepository<Reserva,Long>{

}
