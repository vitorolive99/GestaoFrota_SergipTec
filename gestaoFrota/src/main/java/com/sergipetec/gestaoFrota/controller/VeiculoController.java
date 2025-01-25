package com.sergipetec.gestaoFrota.controller;

import com.sergipetec.gestaoFrota.model.Veiculo;
import com.sergipetec.gestaoFrota.service.VeiculoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {
    private final VeiculoService service;

    public VeiculoController(VeiculoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Veiculo> cadastrarVeiculo(@RequestBody Veiculo veiculo) {
        Veiculo savedVeiculo = service.cadastrarVeiculo(veiculo);
        return ResponseEntity.ok(savedVeiculo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizarVeiculo(@PathVariable Long id, @RequestBody Veiculo veiculo) {
        veiculo.setId(id);
        Veiculo updatedveiculo = service.atualizarVeiculo(veiculo);
        return ResponseEntity.ok(updatedveiculo);
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<Void> excluirVeiculo(@PathVariable Long id) {
        service.removerVeiculo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Veiculo>> listarVeiculos() {
        List<Veiculo> veiculos = service.listarVeiculos();
        return ResponseEntity.ok(veiculos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> getById(@PathVariable Long id) {
        Veiculo veiculo = service.DetailsVeiculo(id);
        return ResponseEntity.ok(veiculo);
    }

}
