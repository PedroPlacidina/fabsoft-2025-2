package br.univille.fabsoft_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Servico;
import br.univille.fabsoft_backend.repository.ServicoRepository;
import br.univille.fabsoft_backend.service.ServicoService;

@Service
public class ServicoServiceImpl implements ServicoService {

    @Autowired
    private ServicoRepository repository;

    @Override
    public List<Servico> getAll(){
        return repository.findAll();
    }

    @Override
    public Servico save(Servico servico){
        return repository.save(servico);
    }

    @Override
    public Servico update(Long id, Servico servico) throws Exception {
        var servicoAntigo = repository.findById(id)
            .orElseThrow( () -> new IllegalArgumentException("Servico nao encontrado com ID :" + id));

        servicoAntigo.setNome(servico.getNome());
        servicoAntigo.setDescricao(servico.getDescricao());
        servicoAntigo.setValor(servico.getValor());

        return repository.save(servicoAntigo);
    }

    @Override
    public Servico delete(Long id) throws Exception {
        var servicoAntigo = repository.findById(id)
            .orElseThrow( () -> new IllegalArgumentException("Servico nao encontrado com ID :" + id));

        repository.delete(servicoAntigo);
        return servicoAntigo;
    }


}
