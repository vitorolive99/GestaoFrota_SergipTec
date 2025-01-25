package com.sergipetec.gestaoFrota.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Veiculo {
    @Id
    private Long id;
    private String modelo;
    private String fabricante;
    private int ano;
    private double preco;
    private String cor;

    // Construtor
    public Veiculo(Long id, String modelo, String fabricante, int ano, double preco, String cor) {
        this.id = id;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.ano = ano;
        this.preco = preco;
        this.cor = cor;
    }

    public Veiculo() {

    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }
}
