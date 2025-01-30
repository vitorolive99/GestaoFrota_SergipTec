package com.sergipetec.gestaoFrota.controller;

import com.sergipetec.gestaoFrota.model.Veiculo;
import com.sergipetec.gestaoFrota.service.VeiculoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {
    private final VeiculoService service;

    public VeiculoController(VeiculoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> cadastrarVeiculo(@RequestBody Veiculo veiculo) {
        Veiculo savedVeiculo = null;
        try {
            savedVeiculo = service.cadastrarVeiculo(veiculo);
            return ResponseEntity.ok(savedVeiculo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarVeiculo(@PathVariable Long id, @RequestBody Veiculo veiculo) {
        veiculo.setId(id);
        Veiculo updatedVeiculo = null;
        try {
            updatedVeiculo = service.atualizarVeiculo(veiculo);
            return ResponseEntity.ok(updatedVeiculo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<Void> excluirVeiculo(@PathVariable Long id) {
        if (service.DetailsVeiculo(id) != null) {
            service.removerVeiculo(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Veiculo>> listarVeiculos() {
        List<Veiculo> veiculos = service.listarVeiculos();
        if (veiculos != null) {
            return ResponseEntity.ok(veiculos);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> getById(@PathVariable Long id) {
        Veiculo veiculo = service.DetailsVeiculo(id);
        if (veiculo != null) {
            return ResponseEntity.ok(veiculo);
        }
        return ResponseEntity.notFound().build();
    }

}
