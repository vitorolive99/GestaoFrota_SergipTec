async function listarVeiculos() {
    try {
        const response = await fetch('/veiculos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao listar veículos: ${response.statusText}`);
        }

        const veiculos = await response.json();
        const tabela = document.getElementById('listaVeiculos');

        preencherTabela(tabela,veiculos);

    } catch (error) {
        console.error(error);
        alert('Erro ao carregar a lista de veículos.');
    }
}

async function pesquisarFiltros() {
    let type = document.getElementById('tipoVeiculo').value;
    let modelo = document.getElementById('modelo').value;
    let fabricante = document.getElementById('fabricante').value;
    let ano = (document.getElementById('ano').value);
    let cor = document.getElementById('cor').value;
    let cilindradas = document.getElementById('cilindradas').value;
    let tipoCombustivel = document.getElementById('tipoCombustivel').value;
    let numPortas = document.getElementById('numPortas').value;
    let valorMin = document.getElementById('valorMin').value;
    let valorMax = document.getElementById('valorMax').value;

    console.log(ano)
    try {
        const response = await fetch('/veiculos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao listar veículos: ${response.statusText}`);
        }

        let veiculos = await response.json();
        const tabela = document.getElementById('listaVeiculos');

        if (modelo !== '') {
            veiculos = veiculos.filter(f => f.modelo.toLowerCase() === modelo.toLowerCase());
        }
        if (fabricante !== '') {
            veiculos = veiculos.filter(f => f.fabricante.toLowerCase() === fabricante.toLowerCase());
        }
        if (ano !== '') {
            veiculos = veiculos.filter(f => f.ano === parseInt(ano));
        }
        if (cor !== '') {
            veiculos = veiculos.filter(f => f.cor.toLowerCase() === cor.toLowerCase());
        }
        if (valorMin !== '' && valorMax !== '') {
            veiculos = veiculos.filter(f => f.preco >= parseFloat(valorMin) && f.preco <= parseFloat(valorMax));
        }
        if (type !== '' && type === 'carro') {
            if (numPortas !== '') {
                veiculos = veiculos.filter(f => f.numPortas === parseInt(numPortas));
            }
            if (tipoCombustivel !== '') {
                veiculos = veiculos.filter(f => f.tipoCombustivel === tipoCombustivel);
            }
        }else{
            if (cilindradas !== '') {
                veiculos = veiculos.filter(f => f.cilindradas === parseInt(cilindradas));
            }
        }

        preencherTabela(tabela,veiculos);

    } catch (error) {
        console.error(error);
        alert('Erro ao carregar ao filtrar de veículos.');
    }
}

async function cadastrarVeiculo(){
    let veiculo;
    let type = document.getElementById('tipoVeiculo').value;
    let modelo = document.getElementById('modelo').value;
    let fabricante = document.getElementById('fabricante').value;
    let ano = parseInt(document.getElementById('ano').value);
    let cor = document.getElementById('cor').value;
    let valor = parseFloat(document.getElementById('valor').value);

    if(type === 'carro') {
        let numPortas = parseInt(document.getElementById('numPortas').value);
        let tipoCombustivel = document.getElementById('tipoCombustivel').value;

        veiculo = new Carro(modelo,fabricante,ano,cor,valor,numPortas,tipoCombustivel);

    } else {
        let cilindradas = parseInt(document.getElementById('cilindradas').value);

        veiculo = new Moto (modelo,fabricante,ano,cor,valor,cilindradas);
    }

    veiculo.type = type;

    console.log(veiculo);

    try {
        const response = await fetch('/veiculos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(veiculo),
        });

        if (response.ok) {
            alert('Veículo cadastrado com sucesso!');

            const veiculoCadastrado = await response.json();
            window.location.href = `details.html?id=${veiculoCadastrado.id}`;
        } else {
            const errorData = await response.json();
            console.error('Erro ao cadastrar veículo:', errorData);
            alert('Erro ao cadastrar veículo. Verifique os dados e tente novamente.');
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao cadastrar veículo.');
    }
}

async function carregaDetalhes() {
    const queryParams = new URLSearchParams(window.location.search);
    const veiculoId = queryParams.get('id');

    if (veiculoId) {
        try {
            const response = await fetch(`/veiculos/${veiculoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const veiculo = await response.json();

                // Preencher os dados na página
                document.getElementById('editLink').href = `edit.html?id=${veiculoId}`
                document.getElementById('nomeModelo').innerText = veiculo.modelo;
                document.getElementById('nomeFabricante').innerText = veiculo.fabricante;
                document.getElementById('anoVeiculo').innerText = veiculo.ano;
                document.getElementById('corVeiculo').innerText = veiculo.cor;
                document.getElementById('precoVeiculo').innerText = `R$ ${veiculo.preco}`;

                if (veiculo.type === 'carro') {
                    document.getElementById('cilindradas').style.display = 'none'
                    document.getElementById('numPortas').style.display = 'block'
                    document.getElementById('tipoCombustivel').style.display = 'block'
                    document.getElementById('numPortas').innerText = veiculo.numPortas;
                    document.getElementById('tipoCombustivel').innerText = veiculo.tipoCombustivel;
                } else {
                    document.getElementById('cilindradas').style.display = 'block'
                    document.getElementById('numPortas').style.display = 'none'
                    document.getElementById('tipoCombustivel').style.display = 'none'
                    document.getElementById('cilindradas').innerText = veiculo.cilindradas;
                }
            } else {
                console.error('Erro ao buscar veículo:', response.statusText);
                alert('Erro ao carregar os detalhes do veículo.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao carregar os detalhes do veículo.');
        }
    }
}

function excluirVeiculo() {

}

function preencherTabela(tabela, veiculos) {
    tabela.innerHTML = '';

    veiculos.forEach(veiculo => {
        const row = `
                <tr>
                    <td>${veiculo.modelo}</td>
                    <td>${veiculo.fabricante}</td>
                    <td>${veiculo.ano}</td>
                    <td>${veiculo.cor}</td>
                    <td>R$ ${veiculo.preco}</td>
                    <td>
                        <a href="details.html?id=${veiculo.id}" class="btn btn-sm btn-primary"><i class="fa-solid fa-info"></i></a>
                        <a href="edit.html?id=${veiculo.id}" class="btn btn-sm btn-primary"><i class="fa-solid fa-pen-to-square"></i></a>
                        <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>`;
        tabela.innerHTML += row;
    });
}

function alterarCamposTipoVeiculo() {
    document.getElementById('tipoVeiculo').addEventListener('change', function () {
        const tipoVeiculo = this.value;

        // Seleciona os containers
        const cilindradasContainer = document.getElementById('cilindradasContainer');
        const tipoCombustivelContainer = document.getElementById('tipoCombustivelContainer');
        const numPortasContainer = document.getElementById('numPortasContainer');
        const combustivelLabel = document.getElementById('combustivelLabel');
        const espacador = document.getElementById('espacador');
        const portasLabel = document.getElementById('portasLabel');

        if (tipoVeiculo === 'moto') {
            // Exibe apenas o campo de cilindradas
            cilindradasContainer.style.display = 'block';
            espacador.style.display = 'block';
            tipoCombustivelContainer.style.display = 'none';
            numPortasContainer.style.display = 'none';
            combustivelLabel.style.display = 'none';
            portasLabel.style.display = 'none';
        } else if (tipoVeiculo === 'carro') {
            // Exibe os campos relacionados a carros
            cilindradasContainer.style.display = 'none';
            espacador.style.display = 'none';
            tipoCombustivelContainer.style.display = 'block';
            numPortasContainer.style.display = 'block';
            combustivelLabel.style.display = 'block';
            portasLabel.style.display = 'block';
        }
    });
}

if (document.getElementById('tipoVeiculo')) {
    alterarCamposTipoVeiculo();
}

class Veiculo {
    type;
    id;
    modelo;
    fabricante;
    ano;
    cor;
    preco;

    constructor(modelo, fabricante, ano, cor, preco) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.ano = ano;
        this.cor = cor;
        this.preco = preco;
    }
}

class Carro extends Veiculo {
    numPortas;
    tipoCombustivel;

    constructor(modelo, fabricante, ano, cor, preco, numPortas, tipoCombustivel) {
        super(modelo, fabricante, ano, cor, preco);
        this.numPortas = numPortas;
        this.tipoCombustivel = tipoCombustivel;
    }
}

class Moto extends Veiculo {
    cilindradas;

    constructor(modelo, fabricante, ano, cor, preco, cilindradas) {
        super(modelo, fabricante, ano, cor, preco);
        this.cilindradas = cilindradas;
    }
}


