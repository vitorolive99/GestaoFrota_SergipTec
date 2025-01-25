-- Inserção de carros
INSERT INTO tb_carro (modelo, fabricante, ano, cor, preco, num_portas, tp_combustivel)
VALUES
    ('Fusca', 'Volkswagen', 1975, 'cinza', 15000.00, 2, 'gasolina'),
    ('Civic', 'Honda', 2020, 'preto', 90000.00, 4, 'flex'),
    ('Fiesta', 'Ford', 2015, 'vermelho', 25000.00, 4, 'etanol'),
    ('Onix', 'Chevrolet', 2022, 'branco', 65000.00, 4, 'flex');

-- Inserção de motos
INSERT INTO tb_moto (modelo, fabricante, ano, cor, preco, cilindrada)
VALUES
    ('Hornet', 'Honda', 2018, 'vermelho', 30000.00, 600),
    ('CG 160', 'Honda', 2021, 'azul', 12000.00, 160);
