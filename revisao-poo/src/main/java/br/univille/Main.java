package br.univille;

import br.univille.entity.Cidade;
import br.univille.entity.Cliente;

public class Main {
    public static void main(String[] args) {
        //System.out.println("Hello world!");
        
        var cliente = new Cliente();
        cliente.setNome("mateus");
        cliente.setIdade(22);
        cliente.setPeso(45);

        Cidade cidade = new Cidade("Joinville");

        cliente.setCidade(cidade);
    }
}