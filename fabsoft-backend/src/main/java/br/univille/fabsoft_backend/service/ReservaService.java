package br.univille.fabsoft_backend.service;

import java.util.List;

import br.univille.fabsoft_backend.entity.Reserva;

public interface ReservaService {
    List<Reserva> getAll();
    Reserva save(Reserva reserva);
    Reserva update(Long id, Reserva reserva) throws Exception;
    Reserva delete(Long id) throws Exception;
    

}
