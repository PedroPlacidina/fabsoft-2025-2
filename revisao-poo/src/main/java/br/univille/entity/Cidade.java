package br.univille.entity;

public class Cidade {
    private String nome;

    //Construtor ininicializar a variavel
    public Cidade(String nome/*Parametro */){
        this.nome = nome;
    }

    public String getNome(){
        return this.nome;
    }
}
