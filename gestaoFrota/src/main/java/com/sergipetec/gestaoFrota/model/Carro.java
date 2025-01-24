package com.sergipetec.gestaoFrota.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Carro extends Veiculo {
    private int numPortas;
    private String tipoCombustivel;

    public Carro(String modelo, String fabricante, int ano, double preco, int numPortas, String tipoCombustivel) {
        super(modelo, fabricante, ano, preco);
        this.numPortas = numPortas;
        this.tipoCombustivel = tipoCombustivel;
    }

    public Carro() {

    }
}
