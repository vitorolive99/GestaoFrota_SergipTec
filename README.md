# GestaoFrota_SergipTec

Este é um projeto de sistema de gestão de frota desenvolvido em **Java**, utilizando **Spring Boot** para o backend e **HTML, CSS, Bootstrap e JavaScript** para o frontend. O sistema permite o gerenciamento de veículos como carros e motos, com funcionalidades CRUD (Create, Read, Update e Delete) e persistência em um banco de dados relacional PostgreSQL.

## Funcionalidades
- Cadastro de veículos (Carros e Motos);
- Atualização de informações dos veículos;
- Exclusão de veículos;
- Listagem de todos os veículos;
- Busca por ID de um veículo;

## Tecnologias Utilizadas

### Backend
- **Java**: Linguagem de programação principal;
- **Spring Boot**: Framework para criar aplicações Java;
- **JDBC**: Para comunicação direta com o banco de dados;
- **PostgreSQL**: Banco de dados relacional utilizado para persistência de dados.

### Frontend
- **HTML**: Estruturação das páginas;
- **CSS**: Estilização das interfaces;
- **BootStrap**: Estilização das interfaces;
- **JavaScript**: Funcionalidades dinâmicas e interações.

### Outros
- **IntelliJ IDEA**: IDE utilizada no desenvolvimento;
- **Postman**: Ferramenta para testar os endpoints da API;
- **Git/GitHub**: Versionamento de código.

## Estrutura do Projeto

```plaintext
src/
├── main/
│   ├── java/com/sergipetec/gestaoFrota
│   │   ├── controller/      # Endpoints da API
│   │   ├── dao/             # Classes de acesso ao banco de dados
│   │   ├── model/           # Entidades do sistema (Carro, Moto, Veículo)
|   |   ├── service/         # Regras e validações
│   │   └── util/            # Conexão com o banco de dados
│   ├── resources/
|   |   ├── database/        # Arquivos de criação do banco e povoamento
│       ├── static/          # Arquivos estáticos (HTML, CSS, JS)
```

## Como Executar

### Requisitos
- Java 17 ou superior;
- PostgreSQL instalado e configurado;
- IntelliJ IDEA ou outra IDE de sua preferência;

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/vitorolive99/GestaoFrota_SergipTec.git
   cd GestaoFrota_SergipTec
   ```

2. Configure o banco de dados:
   - Crie um banco de dados PostgreSQL seguindo os comandos escritos no arquivo sql em `src/main/resources/database/schema.sql`; 
   - Atualize as credenciais de acesso ao banco no arquivo `database.properties` e `application.properties`:
     ```database.properties
     db.url=jdbc:postgresql://localhost:5432/db_frota
     db.user=seu_usuario
     db.password=sua_senha
     ```
     ```application.properties
     spring.application.name=gestaoFrota
     # Configuração do banco de dados
     spring.datasource.url=jdbc:postgresql://localhost:5432/db_frota
     spring.datasource.username=seu_usuario
     spring.datasource.password=sua_senha
     spring.datasource.driver-class-name=org.postgresql.Driver
      
     # Hibernate configurações
     spring.jpa.hibernate.ddl-auto=none
     spring.jpa.show-sql=true
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
     ```

3. Execute a aplicação:
   - No IntelliJ IDEA, rode a classe principal `GestaoFrotaApplication`;
   - O servidor iniciará em `http://localhost:8080`.

4. Abra o navegador para acessar a interface inicial.

5. Navegue pela interface para testar os métodos desenvolvidos e aplicar filtros nas consultas.

## Autor
Desenvolvido por **Vitor Oliveira**.

