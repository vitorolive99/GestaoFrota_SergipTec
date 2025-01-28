package com.sergipetec.gestaoFrota;

import com.sergipetec.gestaoFrota.model.Carro;
import com.sergipetec.gestaoFrota.service.VeiculoService;

public class app {
    public static void main(String[] args) {
        Carro v = new Carro();
        v.setAno(2010);
        v.setPreco(15000);
        v.setFabricante("");
        v.setModelo("Civic");
        v.setNumPortas(4);
        v.setTipoCombustivel("etanol");

        VeiculoService service = new VeiculoService();
        service.cadastrarVeiculo(v);
    }
}
