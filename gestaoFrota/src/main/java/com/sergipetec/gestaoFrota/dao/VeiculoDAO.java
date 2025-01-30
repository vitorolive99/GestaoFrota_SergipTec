package com.sergipetec.gestaoFrota.dao;

import com.sergipetec.gestaoFrota.model.Carro;
import com.sergipetec.gestaoFrota.model.Moto;
import com.sergipetec.gestaoFrota.model.Veiculo;
import com.sergipetec.gestaoFrota.util.DatabaseConnection;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class VeiculoDAO implements IVeiculoDAO {

    @Override
    public Veiculo save(Veiculo veiculo) {
        String sql;
        Connection connection = DatabaseConnection.getConnection();
        if (veiculo instanceof Carro carro) {
            sql = """                   
                    INSERT INTO tb_carro (modelo, fabricante, ano, cor, preco, num_portas, tp_combustivel)
                    VALUES (?, ?, ?, ?, ?, ?, ?);
                    """;

            try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
                preencherStatementCarro(statement, carro);
                statement.executeUpdate();

                ResultSet rs = statement.getGeneratedKeys();
                rs.next();
                carro.setId(rs.getLong("id"));

                connection.close();
                return carro;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        if (veiculo instanceof Moto moto) {
            sql = """
                    INSERT INTO tb_moto (modelo, fabricante, ano, cor, preco, cilindrada)
                    VALUES (?, ?, ?, ?, ?, ?);
                    """;

            try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
                preencherStatementMoto(statement, moto);
                statement.executeUpdate();

                ResultSet rs = statement.getGeneratedKeys();
                rs.next();
                moto.setId(rs.getLong("id"));

                connection.close();
                return moto;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return null;
    }

    @Override
    public Veiculo update(Veiculo veiculo) {
        String sql;
        Connection connection = DatabaseConnection.getConnection();
        if (veiculo instanceof Carro carro) {
            sql = """
                    UPDATE tb_carro SET modelo = ?, fabricante = ?, ano = ?, cor = ?, preco = ?, num_portas = ?, tp_combustivel = ? WHERE id = ?;
                    """;

            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                preencherStatementCarro(statement, carro);
                statement.setLong(8, carro.getId());
                statement.executeUpdate();

                connection.close();
                return carro;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        } else if (veiculo instanceof Moto moto) {
            sql = """
                UPDATE tb_moto SET modelo = ?, fabricante = ?, ano = ?, cor = ?, preco = ?, cilindrada = ? WHERE id = ?
                """;

            try (PreparedStatement stmt = connection.prepareStatement(sql)) {
                preencherStatementMoto(stmt, moto);
                stmt.setLong(7, moto.getId());
                stmt.executeUpdate();

                connection.close();
                return moto;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        Connection connection = DatabaseConnection.getConnection();
        String sql = """
                DELETE FROM tb_carro WHERE id = ?;
                """;

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setLong(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        sql = """
                DELETE FROM tb_moto WHERE id = ?;
                """;

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();

            connection.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public List<Veiculo> getAll() {
        List<Veiculo> veiculos = new ArrayList<>();
        String sql = """
                SELECT id, modelo, fabricante, ano, cor, preco, num_portas, tp_combustivel, NULL AS cilindrada
                FROM tb_carro
                UNION
                SELECT id, modelo, fabricante, ano, cor, preco, NULL AS num_portas, NULL AS tp_combustivel, cilindrada
                FROM tb_moto;
                """;

        Connection connection = DatabaseConnection.getConnection();
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {

            organizaVeiculos(veiculos, resultSet);
            connection.close();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return veiculos;
    }

    @Override
    public Veiculo getById(Long id) {
        Veiculo veiculo;
        Connection connection = DatabaseConnection.getConnection();

        String sql = """
                SELECT id, modelo, fabricante, ano, cor, preco, num_portas, tp_combustivel, NULL AS cilindrada
                FROM tb_carro WHERE id = ?
                UNION
                SELECT id, modelo, fabricante, ano, cor, preco, NULL AS num_portas, NULL AS tp_combustivel, cilindrada
                FROM tb_moto WHERE id = ?;
                """;

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, id);
            stmt.setLong(2, id);
            try (ResultSet rs = stmt.executeQuery()) {
                List<Veiculo> veiculos = new ArrayList<>();
                organizaVeiculos(veiculos, rs);

                veiculo = veiculos.getFirst();
                connection.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return veiculo;
    }

    /**
     * Organizes data from the provided ResultSet into a list of Veiculo objects.
     * For each row in the ResultSet, determines whether the vehicle is a Carro or Moto
     * based on the presence of specific attributes and adds the corresponding object to the list.
     *
     * @param veiculos the list to which the Veiculo objects will be added
     * @param rs       the ResultSet containing data to be mapped into Veiculo objects
     * @throws SQLException if an error occurs while accessing the ResultSet
     */
    private void organizaVeiculos(List<Veiculo> veiculos, ResultSet rs) throws SQLException {
        while (rs.next()) {
            int id = (int) rs.getLong("id");
            String modeloResult = rs.getString("modelo");
            String fabricanteResult = rs.getString("fabricante");
            String corResult = rs.getString("cor");
            int anoResult = rs.getInt("ano");
            double preco = rs.getDouble("preco");

            if (rs.getObject("num_portas") != null) { // Verifica se é um carro
                int numPortas = rs.getInt("num_portas");
                String tpCombustivel = rs.getString("tp_combustivel");
                veiculos.add(new Carro((long) id, modeloResult, fabricanteResult, anoResult, preco, numPortas, tpCombustivel, corResult));
            } else { // Caso contrário é uma moto
                int cilindrada = rs.getInt("cilindrada");
                veiculos.add(new Moto((long) id, modeloResult, fabricanteResult, anoResult, preco, cilindrada, corResult));
            }
        }
    }

    /**
     * Populates the provided PreparedStatement with the attributes of a Carro object.
     * Sets the model, manufacturer, year, price, ports number and type of fuel values in the statement.
     *
     * @param stmt  the PreparedStatement to be populated with Carro attributes
     * @param carro the Carro object whose attributes are used to populate the PreparedStatement
     * @throws SQLException if any SQL error occurs while setting the parameters
     */
    private static void preencherStatementCarro(PreparedStatement stmt, Carro carro) throws SQLException {
        stmt.setString(1, carro.getModelo());
        stmt.setString(2, carro.getFabricante());
        stmt.setInt(3, carro.getAno());
        stmt.setString(4, carro.getCor());
        stmt.setDouble(5, carro.getPreco());
        stmt.setInt(6, carro.getNumPortas());
        stmt.setString(7, carro.getTipoCombustivel());
    }

    /**
     * Populates the given PreparedStatement with the data from the provided Moto instance.
     * Sets the model, manufacturer, year, price, and cylinder capacity values in the statement.
     *
     * @param stmt the PreparedStatement to be populated with data.
     * @param moto the Moto instance containing the values to set in the PreparedStatement.
     * @throws SQLException if an error occurs while setting the statement values.
     */
    private static void preencherStatementMoto(PreparedStatement stmt, Moto moto) throws SQLException {
        stmt.setString(1, moto.getModelo());
        stmt.setString(2, moto.getFabricante());
        stmt.setInt(3, moto.getAno());
        stmt.setString(4, moto.getCor());
        stmt.setDouble(5, moto.getPreco());
        stmt.setInt(6, moto.getCilindradas());
    }
}
