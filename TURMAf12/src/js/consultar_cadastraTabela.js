let editID = null;

function montaTabela() {

    fetch(`http://localhost:3000/carros`)
        .then(resposta => resposta.json())
        .then(dadosCarros => {
            let tabela = document.getElementById('tabela-javascript');
            tabela.innerHTML = '';

            dadosCarros.forEach(function (carro) {
                let row = tabela.insertRow();
                row.innerHTML = `
                    <td>${carro.id}</td>
                    <td>${carro.marca}</td>
                    <td>${carro.modelo}</td>
                    <td>${carro.cor}</td>
                    <td>${carro.ano}</td>
                    <td>${carro.valor}</td>
                    <td>
                    <button 
                        type="button btn-sm"
                        onclick="editarUsuario('${carro.id}', '${carro.marca}', '${carro.modelo}', '${carro.cor}', '${carro.ano}','${carro.valor}')"
                        class="btn btn-info">
                        <i class="bi bi-pencil-square"></i> Editar
                    </button>

                    <button
                        type="button btn-sm"
                        onclick="excluirUsuario('${carro.id}')"
                        class="btn btn-danger cor1">
                        <i class="bi bi-trash"></i>
                        Excluir
                    </button>
                    </td>
                `;
            });
        });
}

document.getElementById("btn-consultar1").addEventListener('click', function () {
    montaTabela();
});

function cadastrarCarros() {
    let id = document.getElementById("id").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;
    let cor = document.getElementById("cor").value;
    let ano = document.getElementById("ano").value;
    let valor = document.getElementById("valor").value


    if (!id) {
        alert("Por favor, preencha o ID do veículo.");
        return;
    }
    if (!marca) {
        alert("Por favor, preencha o tipo do veículo.");
        return;
    }
    if (!modelo) {
        alert("Por favor, preencha a marca do veículo.");
        return;
    }
    if (!cor) {
        alert("Por favor, preencho modelo do veículo.");
        return;
    }
    if (!ano) {
        alert("Por favor, insira o ano do veículo.");
        return;
    }
    if (!valor) {
        alert("Por favor, preencha a cor do veículo.");
        return;
    }
    if (!valor) {
        alert("Por favor, preencha o valor do veículo.");
        return;
    }

    let novoCarro = {
        id: id,
        marca: marca,
        modelo: modelo,
        cor: cor,
        ano: ano,
        valor: valor,
    };

    fetch("http://localhost:3000/carros", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoCarro)
    })
    .then(response => response.json())
    .then(data => {
        alert("Carro cadastrado com sucesso!");
    })
    .catch(error => {
        console.error("Erro ao cadastrar carro:", error);
        res.status(500).json({ error: "Erro ao cadastrar o carro" });
    });
}

function excluirUsuario(id) {
    // Substitua result.isConfirmed pelo método correto de confirmar a exclusão
    if (confirm("Ops Exluir")) {
        fetch(`http://localhost:3000/carros/${id}`, {
            method: 'DELETE'
        })
        .then(resposta => {
            if (resposta.ok) {
                alert('Exclusão bem-sucedida, então atualize a tabela')
                montaTabela();
            } else {
                // Trate casos de erro, se necessário
                console.error('Erro ao excluir usuário:', resposta.statusText);
            }
        })
        .catch(error => {
            console.error('Erro ao excluir usuário:', error);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    montaTabela();
});

function editarUsuario(id, marca, modelo, cor, ano, valor) {
    document.getElementById('id').value = id;
    document.getElementById('marca').value = marca;
    document.getElementById('modelo').value = modelo;
    document.getElementById('cor').value = cor;
    document.getElementById('ano').value = ano;
    document.getElementById('valor').value = valor;

    editID = id;
    document.getElementById('btn-consultar1').innerText = "Atualizar";
}

document.getElementById("btn-consultar1").addEventListener("click", function() {
    let id = document.getElementById("id").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;
    let cor = document.getElementById("cor").value;
    let ano = document.getElementById("ano").value;
    let valor = document.getElementById("valor").value;

    if (!id) {
        alert("Por favor, preencha o ID do veículo.");
        return;
    }
    if (!marca) {
        alert("Por favor, preencha o tipo do veículo.");
        return;
    }
    if (!modelo) {
        alert("Por favor, preencha a marca do veículo.");
        return;
    }
    if (!cor) {
        alert("Por favor, preencho modelo do veículo.");
        return;
    }
    if (!ano) {
        alert("Por favor, insira o ano do veículo.");
        return;
    }
    if (!valor) {
        alert("Por favor, preencha a cor do veículo.");
        return;
    }
    if (!valor) {
        alert("Por favor, preencha o valor do veículo.");
        return;
    }

    // convert image to base64
    // let reader = new FileReader();
    // reader.onload = function() {
    //     let base64 = reader.result;

    //     let body = {
    //         id: id,
    //         marca: marca,
    //         modelo: modelo,
    //         cor: cor,
    //         ano: ano,
    //         valor: valor,
    //         image: base64 // incluir a imagem no corpo da requisição
    //     };

        if (id != null) {
            fetch(`http://localhost:3000/carros/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(resposta => resposta.json())
            .then(carro => {
                montaTabela();
                document.getElementById('btn-consultar1').innerText = "Cadastrar";
                editID = null;
            })
            .catch(error => {
                console.error('Erro ao editar usuário:', error);
                alert('Erro ao editar usuário.');
            });
            return;
        }

        fetch(`http://localhost:3000/carros`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resposta => resposta.json())
        .then(usuario => {
            Swal.fire({
                title: 'Cadastrado com sucesso',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
            });
            montaTabela();
            limparFormulario();
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário.');
        });

    reader.readAsDataURL(inputImage);
});