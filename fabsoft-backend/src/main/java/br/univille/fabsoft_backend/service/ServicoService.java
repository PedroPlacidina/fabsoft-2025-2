package br.univille.fabsoft_backend.service;

import java.util.List;

import br.univille.fabsoft_backend.entity.Servico;

public interface ServicoService {
    List<Servico> getAll();
    Servico save(Servico servico);
    Servico update(Long id, Servico servico) throws Exception;
    Servico delete(Long id) throws Exception;
}
