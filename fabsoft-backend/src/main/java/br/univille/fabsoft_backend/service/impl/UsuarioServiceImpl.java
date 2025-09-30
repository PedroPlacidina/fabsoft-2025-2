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
        
        var UsuarioAntigo = repository.getById(id);
        if(UsuarioAntigo == null){
            throw new Exception("Usuário não encontrado");
        }

        UsuarioAntigo.setNome(usuario.getNome());
        UsuarioAntigo.setEmail(usuario.getEmail());
        UsuarioAntigo.setTelefone(usuario.getTelefone());
        UsuarioAntigo.setSenha(usuario.getSenha());
        UsuarioAntigo.setTipo(usuario.getTipo());

        repository.save(UsuarioAntigo);
        return UsuarioAntigo;
    }


}
