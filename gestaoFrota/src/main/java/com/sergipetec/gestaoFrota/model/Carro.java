package com.sergipetec.gestaoFrota.model;

import jakarta.persistence.Entity;

@Entity
public class Carro extends Veiculo {
    private int numPortas;
    private String tipoCombustivel;

    public Carro(Long id, String modelo, String fabricante, int ano, double preco, int numPortas, String tipoCombustivel, String cor) {
        super(id, modelo, fabricante, ano, preco, cor);
        this.numPortas = numPortas;
        this.tipoCombustivel = tipoCombustivel;
    }

    public Carro() {
    }

    public String getTipoCombustivel() {
        return tipoCombustivel;
    }

    public void setTipoCombustivel(String tipoCombustivel) {
        this.tipoCombustivel = tipoCombustivel;
    }

    public int getNumPortas() {
        return numPortas;
    }

    public void setNumPortas(int numPortas) {
        this.numPortas = numPortas;
    }
}
