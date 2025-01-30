package com.sergipetec.gestaoFrota.service;

import com.sergipetec.gestaoFrota.dao.VeiculoDAO;
import com.sergipetec.gestaoFrota.model.Moto;
import com.sergipetec.gestaoFrota.model.Veiculo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VeiculoService {
    private static final VeiculoDAO veiculoDAO = new VeiculoDAO();

    public Veiculo cadastrarVeiculo(Veiculo veiculo) throws Exception {
        validarDados(veiculo);

        veiculoDAO.save(veiculo);
        return veiculo;
    }

    public List<Veiculo> listarVeiculos() {
        return veiculoDAO.getAll();
    }

    public void removerVeiculo(Long id) {
        veiculoDAO.delete(id);
    }

    public Veiculo atualizarVeiculo(Veiculo veiculo) throws Exception {
        validarDados(veiculo);

        veiculoDAO.update(veiculo);
        return veiculo;
    }

    public Veiculo DetailsVeiculo(Long id) {
        return veiculoDAO.getById(id);
    }

    private void validarDados(Veiculo veiculo) throws Exception {
        if (veiculo.getModelo() == null || veiculo.getModelo().isEmpty()) {
            throw new Exception("O modelo do veículo é obrigatório.");
        }
        if (veiculo.getFabricante() == null || veiculo.getFabricante().isEmpty()) {
            throw new Exception("O fabricante do veículo é obrigatório.");
        }
        if (veiculo.getAno() < 1886 || veiculo.getAno() > java.time.Year.now().getValue()) {
            throw new Exception("Ano do veículo inválido.");
        }
        if (veiculo.getCor() == null || veiculo.getCor().isEmpty()) {
            throw new Exception("A cor do veículo é obrigatório.");
        }
        if (veiculo.getPreco() <= 0) {
            throw new Exception("Preço do veículo inválido.");
        }
        if (veiculo instanceof Moto) {
            if (((Moto) veiculo).getCilindradas() < 50) {
                throw new Exception("Cilindrada do veículo inválida.");
            }
        }
    }
}
