package com.sergipetec.gestaoFrota.model;

import jakarta.persistence.Entity;

@Entity
public class Moto extends Veiculo {
    private int cilindrada;

    public Moto(Long id, String modelo, String fabricante, int ano, double preco, int cilindrada, String cor) {
        super(id, modelo, fabricante, ano, preco, cor);
        this.cilindrada = cilindrada;
    }

    public Moto() {
    }

    public int getCilindrada() {
        return cilindrada;
    }

    public void setCilindrada(int cilindrada) {
        this.cilindrada = cilindrada;
    }
}
