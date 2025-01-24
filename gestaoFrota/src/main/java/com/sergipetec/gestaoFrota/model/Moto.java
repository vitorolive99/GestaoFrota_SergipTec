package com.sergipetec.gestaoFrota.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Moto extends Veiculo {
    private int cilindrada;

    public Moto(String modelo, String fabricante, int ano, double preco, int cilindrada) {
        super(modelo, fabricante, ano, preco);
        this.cilindrada = cilindrada;
    }

    public Moto() {

    }
}
