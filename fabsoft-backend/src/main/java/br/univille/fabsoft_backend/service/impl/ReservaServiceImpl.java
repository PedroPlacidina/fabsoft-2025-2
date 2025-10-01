package br.univille.fabsoft_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Reserva;
import br.univille.fabsoft_backend.repository.ReservaRepository;
import br.univille.fabsoft_backend.service.ReservaService;

@Service
public class ReservaServiceImpl implements ReservaService {

    @Autowired
    private ReservaRepository repository;

    @Override
    public List<Reserva> getAll() {
        return repository.findAll();
    }

    @Override
    public Reserva save(Reserva reserva) {
        return repository.save(reserva);
    }

    @Override
    public Reserva update(Long id, Reserva reserva) throws Exception {
        var reservaAntiga = repository.findById(id)
            .orElseThrow( () -> new IllegalArgumentException("Reserva nao encontrada com ID :" + id));

        reservaAntiga.setDataCheckIn(reserva.getDataCheckIn());
        reservaAntiga.setDataCheckOut(reserva.getDataCheckOut());
        reservaAntiga.setStatus(reserva.getStatus());

        return repository.save(reservaAntiga);
            
    }

    @Override
    public Reserva delete(Long id) throws Exception {
        var reservaAntiga = repository.findById(id)
            .orElseThrow( () -> new IllegalArgumentException("Reserva nao encontrada com ID :" + id));
        
        repository.delete(reservaAntiga);
        return reservaAntiga;
    }

}
