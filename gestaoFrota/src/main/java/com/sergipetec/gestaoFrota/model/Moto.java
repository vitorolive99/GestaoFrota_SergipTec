package com.sergipetec.gestaoFrota.model;

import jakarta.persistence.Entity;

@Entity
public class Moto extends Veiculo {
    private int cilindradas;

    public Moto(Long id, String modelo, String fabricante, int ano, double preco, int cilindrada, String cor) {
        super(id, modelo, fabricante, ano, preco, cor);
        this.cilindradas = cilindrada;
    }

    public Moto() {
    }

    public int getCilindradas() {
        return cilindradas;
    }

    public void setCilindradas(int cilindrada) {
        this.cilindradas = cilindrada;
    }
}
