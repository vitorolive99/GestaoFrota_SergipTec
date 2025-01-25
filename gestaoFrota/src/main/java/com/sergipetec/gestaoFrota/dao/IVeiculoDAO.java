package com.sergipetec.gestaoFrota.dao;

import com.sergipetec.gestaoFrota.model.Veiculo;

import java.util.List;

public interface IVeiculoDAO {
    Veiculo save(Veiculo veiculo);
    Veiculo update(Veiculo veiculo);
    void delete(Long id);
    List<Veiculo> getAll();
    Veiculo getById(Long id);
}
