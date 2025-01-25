--################################################################################################################
--Comando 1 Criar tablespace
--################################################################################################################

-- Obs.: criar a pasta para a tablespace e substitua o caminho do diretório correspondente

-- A localização depende da instalalação de cada máquina
CREATE TABLESPACE te_frotabd LOCATION 'D:\Program Files\PostgreSQL\data\te_FrotaBD';

--################################################################################################################
--Comando 2 Criar Database
--################################################################################################################

CREATE DATABASE "db_frota"
    WITH 
    OWNER = postgres --altere o owner de acordo com seu banco de dados
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = te_frotabd
    CONNECTION LIMIT = -1;
	
--################################################################################################################
--Comando 3 Criar Tabelas
--################################################################################################################

CREATE SEQUENCE global_sequence
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    NO CYCLE;

CREATE TABLE tb_carro (
    id             INT PRIMARY KEY DEFAULT nextval('global_sequence'),
    modelo         VARCHAR(100)                                                                   NOT NULL,
    fabricante     VARCHAR(100)                                                                   NOT NULL,
    cor            VARCHAR(100)                                                                   NOT NULL,
    ano            INT                                                                            NOT NULL,
    preco          DECIMAL(10, 2)                                                                 NOT NULL,
    num_portas     INT                                                                            NOT NULL,
    tp_combustivel VARCHAR(50) CHECK (tp_combustivel IN ('gasolina', 'etanol', 'diesel', 'flex')) NOT NULL
);

CREATE TABLE tb_moto(
    id         INT PRIMARY KEY DEFAULT nextval('global_sequence'),
    modelo     VARCHAR(100)   NOT NULL,
    fabricante VARCHAR(100)   NOT NULL,
cor            VARCHAR(100)   NOT NULL,
    ano        INT            NOT NULL,
    preco      DECIMAL(10, 2) NOT NULL,
    cilindrada INT            NOT NULL
);

