package br.univille.entity;

public class Pokemon {
    private String nome;

    public Pokemon(String nome){
        this.nome = nome;
    }

    public String getNome(){
        return this.nome;
    }
}
