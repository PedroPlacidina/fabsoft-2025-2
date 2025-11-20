package br.univille.fabsoft_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Usuario;
import br.univille.fabsoft_backend.repository.UsuarioRepository;
import br.univille.fabsoft_backend.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService{

    @Autowired
    private UsuarioRepository repository;

    @Override
    public List<Usuario> getAll() {
        return repository.findAll();
        
    }

    @Override
    public Usuario save(Usuario usuario) {
        return repository.save(usuario);
    }

    @Override
    public Usuario update(long id, Usuario usuario) throws Exception {
        var usuarioAntigo = repository.findById(id)
            .orElseThrow( () -> new IllegalArgumentException("Usuario nao encontrado com ID :" + id));
                
        usuarioAntigo.setNome(usuario.getNome());
        usuarioAntigo.setEmail(usuario.getEmail());
        usuarioAntigo.setTelefone(usuario.getTelefone());
        
        if(usuario.getSenha() != null && !usuario.getSenha().isBlank()) {
            usuarioAntigo.setSenha(usuario.getSenha());
        }
        if(usuario.getPets() != null) {
            usuarioAntigo.getPets().clear();
            usuarioAntigo.getPets().addAll(usuario.getPets());
        }
        
        if(usuario.getReservas() != null) {
            usuarioAntigo.getReservas().clear();
            usuarioAntigo.getReservas().addAll(usuario.getReservas());
        }

        repository.save(usuarioAntigo);
        return usuarioAntigo;
    }

    @Override
    public Usuario delete(long id) throws Exception {
        var UsuarioAntigo = repository.findById(id)
            .orElseThrow( () -> new IllegalArgumentException("Usuario nao encontrado com ID :" + id));

        repository.delete(UsuarioAntigo);
        return UsuarioAntigo;
    }

    @Override
    public Usuario getById(long id) {
        var retorno = repository.findById(id);
        if (retorno.isPresent()) {
            return retorno.get();
        }
        return null;
    }
       


}
