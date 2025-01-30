const SUCCESS_MESSAGE = 'sucesso';
const ERROR_MESSAGE = 'falha';

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
        exibirModal(ERROR_MESSAGE, 'Erro', 'Erro ao carregar a lista de veículos.');
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
        exibirModal(ERROR_MESSAGE, 'Erro', 'Erro ao carregar ao filtrar de veículos.');
    }
}

async function cadastrarVeiculo(){

    let veiculo = coletarDados();

    try {
        const response = await fetch('/veiculos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(veiculo),
        });

        if (response.ok) {
            const veiculoCadastrado = await response.json();
            exibirModal(SUCCESS_MESSAGE, 'Concluído', 'Veículo cadastrado com sucesso!',
                function (){
                    window.location.href = `details.html?id=${veiculoCadastrado.id}`;
                });
        } else {
            const errorData = await response.json();
            console.error('Erro ao cadastrar veículo:', errorData);
            exibirModal(ERROR_MESSAGE, 'Erro', `Erro ao cadastrar veículo. ${errorData.message}`);
        }
    } catch (error) {
        console.error(error);
        exibirModal(ERROR_MESSAGE, 'Erro', 'Erro ao cadastrar veículo.');
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
                document.getElementById('editLink').href = `edit.html?id=${veiculoId}`;
                document.getElementById('tipoVeiculo').value = veiculo.type;
                document.getElementById('nomeModelo').innerText = veiculo.modelo;
                document.getElementById('nomeFabricante').innerText = veiculo.fabricante;
                document.getElementById('anoVeiculo').innerText = veiculo.ano;
                document.getElementById('corVeiculo').innerText = veiculo.cor;
                document.getElementById('precoVeiculo').innerText = `R$ ${veiculo.preco}`;

                document.querySelector('.btn-excluir').setAttribute('data-id', veiculoId);
                document.querySelector('.btn-excluir').setAttribute('onclick', `excluirVeiculo(${veiculoId})`);

                let numPortasContainer = document.getElementById('numPortasContainer');
                let cilindradasContainer = document.getElementById('cilindradasContainer');
                let tipoCombustivelContainer = document.getElementById('tipoCombustivelContainer');
                if (veiculo.type === 'carro') {
                    tipoCombustivelContainer.style.display = 'block';
                    numPortasContainer.style.display = 'block';
                    cilindradasContainer.style.display = 'none';

                    document.getElementById('numPortas').innerText = veiculo.numPortas;
                    document.getElementById('tipoCombustivel').innerText = veiculo.tipoCombustivel;
                } else if (veiculo.type === 'moto') {
                    tipoCombustivelContainer.style.display = 'none';
                    numPortasContainer.style.display = 'none';
                    cilindradasContainer.style.display = 'block';

                    document.getElementById('cilindradas').innerText = veiculo.cilindradas;
                }

            } else {
                console.error('Erro ao buscar veículo:', response.statusText);
                exibirModal(ERROR_MESSAGE, 'Erro', 'Erro ao carregar os detalhes do veículo.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            exibirModal(ERROR_MESSAGE, 'Erro', 'Erro ao carregar os detalhes do veículo.');
        }
    }
}

async function carregarDetalhesEdit() {
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

                document.getElementById('tipoVeiculo').value = veiculo.type
                document.getElementById('modelo').value = veiculo.modelo;
                document.getElementById('fabricante').value = veiculo.fabricante;
                document.getElementById('ano').value = veiculo.ano;
                document.getElementById('cor').value = veiculo.cor;
                document.getElementById('valor').value = veiculo.preco;

                if (veiculo.type === 'carro') {
                    document.getElementById('tipoCombustivelContainer').style.display = 'block';
                    document.getElementById('numPortasContainer').style.display = 'block';
                    document.getElementById('portasLabel').style.display = 'block';
                    document.getElementById('combustivelLabel').style.display = 'block';

                    document.getElementById('cilindradasContainer').style.display = 'none';
                    document.getElementById('espacador').style.display = 'none';

                    document.getElementById('tipoCombustivel').value = veiculo.tipoCombustivel;
                    document.getElementById('numPortas').value = veiculo.numPortas;
                } else if (veiculo.type === 'moto'){
                    document.getElementById('tipoCombustivelContainer').style.display = 'none';
                    document.getElementById('numPortasContainer').style.display = 'none';
                    document.getElementById('portasLabel').style.display = 'none';
                    document.getElementById('combustivelLabel').style.display = 'none';

                    document.getElementById('cilindradasContainer').style.display = 'block';
                    document.getElementById('espacador').style.display = 'block';

                    document.getElementById('cilindradas').value = veiculo.cilindradas;
                }
            } else {
                console.error('Erro ao buscar veículo:', response.statusText);
                exibirModal(ERROR_MESSAGE, 'Erro', 'Erro ao carregar os detalhes do veículo.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            exibirModal(ERROR_MESSAGE, 'Erro', 'Erro ao carregar os detalhes do veículo.');
        }
    }
}

async function salvarAlteracoes() {
    const queryParams = new URLSearchParams(window.location.search);
    const veiculoId = queryParams.get('id');

    let veiculo = coletarDados();

    if (veiculoId) {
        try{
            const response = await fetch(`veiculos/${veiculoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(veiculo),
            });

            if (response.ok) {
                const veiculoAtualizado = await response.json();
                exibirModal(SUCCESS_MESSAGE,'Registro alterado','Dados alterados com sucesso',
                    function () {
                        window.location.href = `details.html?id=${veiculoAtualizado.id}`;
                    });
            } else {
                const errorData = await response.json();
                console.error('Erro ao salvar alterações:', errorData);

                exibirModal(ERROR_MESSAGE, 'Erro ao alterar dados do veículo', errorData.message)
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            exibirModal(ERROR_MESSAGE, 'Erro', 'Erro ao salvar os dados do veículo.');
        }
    }
}

async function excluirVeiculo(id) {
    exibirModalExclusao().then(async (result) => {
        if (result === 'excluir') {
            try {
                const response = await fetch(`veiculos/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    exibirModal(SUCCESS_MESSAGE, 'Veículo excluído', 'O veículo foi excluído com sucesso.',
                        function () {
                            window.location.href = 'index.html'; // Redireciona para a página inicial
                        });
                } else if (response.status === 404) {
                    // Exibe uma mensagem de erro se o veículo não for encontrado
                    exibirModal(ERROR_MESSAGE, 'Erro', 'Veículo não encontrado.');
                } else {
                    // Exibe uma mensagem de erro genérica
                    exibirModal(ERROR_MESSAGE, 'Erro', 'Não foi possível excluir o veículo.');
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                exibirModal(ERROR_MESSAGE, 'Erro', 'Erro ao excluir o veículo. Tente novamente mais tarde.');
            }
        }
    });
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
                    <button class="btn btn-sm btn-danger btn-excluir" data-id="${veiculo.id}"><i class="fa-solid fa-trash" onclick="excluirVeiculo(${veiculo.id})"></i></button>
                </td>
            </tr>`;
        tabela.innerHTML += row;
    });
}

function coletarDados() {
    let veiculo;
    let type = document.getElementById('tipoVeiculo').value;
    let modelo = document.getElementById('modelo').value;
    let fabricante = document.getElementById('fabricante').value;
    let ano = parseInt(document.getElementById('ano').value);
    let cor = document.getElementById('cor').value;
    let valor = parseFloat(document.getElementById('valor').value);

    if (type === 'carro') {
        let numPortas = parseInt(document.getElementById('numPortas').value);
        let tipoCombustivel = document.getElementById('tipoCombustivel').value;

        veiculo = new Carro(modelo, fabricante, ano, cor, valor, numPortas, tipoCombustivel);

    } else if (type === 'moto') {
        let cilindradas = parseInt(document.getElementById('cilindradas').value);

        veiculo = new Moto(modelo, fabricante, ano, cor, valor, cilindradas);
    }

    veiculo.type = type;

    console.log(veiculo);

    return veiculo;
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

function exibirModal(tipo, titulo, mensagem, callback) {
    if (tipo === 'sucesso') {
        document.getElementById('modal_titulo').innerHTML = titulo;
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_body').innerHTML = mensagem;
        document.getElementById('modal_btn').innerHTML = 'Voltar';
        document.getElementById('modal_btn').className = 'btn btn-success';

        document.getElementById('modal_btn').onclick = function () {
            $('#registroGravacao').modal('hide'); // Fecha o modal
            if (callback) {
                callback(); // Executa o callback (se necessário)
            }
        };
        $('#registroGravacao').modal('show');

    } else if (tipo === 'falha') {
        document.getElementById('modal_titulo').innerHTML = titulo;
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_body').innerHTML = mensagem;
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir';
        document.getElementById('modal_btn').className = 'btn btn-danger';

        document.getElementById('modal_btn').onclick = function () {
            $('#registroGravacao').modal('hide'); // Fecha o modal
            if (callback) {
                callback(); // Executa o callback (se necessário)
            }
        };
        $('#registroGravacao').modal('show');
    }
}

function exibirModalExclusao() {
    return new Promise((resolve) => {
        const modal = $('#modalConfirmacao');

        modal.modal('show');

        $('#btnConfirmarExclusao').one('click', function () {
            resolve('excluir');
            modal.modal('hide');
        });

        modal.one('hidden.bs.modal', function () {
            resolve('fechar');
        });
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


