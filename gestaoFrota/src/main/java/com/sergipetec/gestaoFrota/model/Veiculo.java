package com.sergipetec.gestaoFrota.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Veiculo {
    // Getters e Setters
    @Id
    private Long id;
    private String modelo;
    private String fabricante;
    private int ano;
    private double preco;

    // Construtor
    public Veiculo(String modelo, String fabricante, int ano, double preco) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.ano = ano;
        this.preco = preco;
    }

    public Veiculo() {

    }

}
