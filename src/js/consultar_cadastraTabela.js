function montaTabela() {
  fetch(`http://localhost:3000/carros`)
    .then(resposta => resposta.json())
    .then(dadosCarros => {
      const tabela = document.getElementById('tabela-javascript');
      tabela.innerHTML = '';

      dadosCarros.forEach(carro => {
        const row = tabela.insertRow();
        row.innerHTML = `
          <td>${carro.id}</td>
          <td>${carro.marca}</td>
          <td>${carro.modelo}</td>
          <td>${carro.cor}</td>
          <td>${carro.ano}</td>
          <td>${carro.valor}</td>
          <td>
            <button 
              type="button" 
              class="btn btn-info btn-sm" 
              onclick="editarCarro('${carro.id}', '${carro.marca}', '${carro.modelo}', '${carro.cor}', '${carro.ano}', '${carro.valor}')">
              <i class="bi bi-pencil-square"></i> Editar
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm cor1" 
              onclick="excluirCarro('${carro.id}')">
              <i class="bi bi-trash"></i> Excluir
            </button>
          </td>
        `;
      });
    });
}

function cadastrarCarros() {
  let id = document.getElementById("id").value;
  let marca = document.getElementById("marca").value;
  let modelo = document.getElementById("modelo").value;
  let cor = document.getElementById("cor").value;
  let ano = document.getElementById("ano").value;
  let valor = document.getElementById("valor").value

  if (!id || !marca || !modelo || !cor || !ano || !valor) {
    alert("Por favor, preencha todos os campos do veículo.");
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
      montaTabela();
    })
    .catch(error => {
      console.error("Erro ao cadastrar carro:", error);
      res.status(500).json({
        error: "Erro ao cadastrar o carro"
      });
    });
}

function excluirCarro(id) {
  fetch(`http://localhost:3000/carros/${id}`, {
      method: 'DELETE'
    })
    .then(resposta => {
      if (resposta.ok) {
        alert('Exclusão bem-sucedida, então atualize a tabela');
        montaTabela();
      } else {
        console.error('Erro ao excluir carro:', resposta.statusText);
      }
    })
    .catch(error => {
      console.error('Erro ao excluir carro:', error);
    });
}
let soma = 0

function toggleTabela() {
        let booleano = false;
        soma += 1;
            if(soma == 1){
            booleano = true;
            document.getElementById("tabela-javascript").style.visibility = "visible";
            document.getElementById('btn-consultar').innerText = "Ocultar Tabela";
        }
        if(soma == 2){
            bool = false;
            soma = 0;
            document.getElementById("tabela-javascript").style.visibility = "collapse";
            document.getElementById('btn-consultar').innerText = "Mostrar a Tabela";
        }
        console.log(soma);
        console.log(booleano);
}


function editarCarro(id, marca, modelo, cor, ano, valor) {
  document.getElementById('marca').value = marca;
  document.getElementById('modelo').value = modelo;
  document.getElementById('cor').value = cor;
  document.getElementById('ano').value = ano;
  document.getElementById('valor').value = valor;

  editID = id;
  document.getElementById('btn-consultar1').innerText = "Atualizar";
}

document.getElementById("btn-consultar1").addEventListener("click", function () {
  let inputMARCA = document.getElementById('marca').value;
  let inputMODELO = document.getElementById('modelo').value;
  let inputCOR = document.getElementById('cor').value;
  let inputANO = document.getElementById('ano').value;
  let inputVALOR = document.getElementById('valor').value;

  if (!inputMARCA || !inputMODELO || !inputCOR || !inputANO || !inputVALOR) {
    alert("Por favor, preencha todos os campos do veículo.");
    return;
  }

  let body = {
    marca: inputMARCA,
    modelo: inputMODELO,
    cor: inputCOR,
    ano: inputANO,
    valor: inputVALOR
  };

  if (editID != null) {
    fetch(`http://localhost:3000/carros/${editID}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(resposta => {
        if (resposta.ok) {
          alert("Carro atualizado com sucesso!");
          montaTabela();
          limparFormulario();
          document.getElementById('btn-consultar1').innerText = "Cadastrar";
          editID = null;
        } else {
          console.error('Erro ao editar carro:', resposta.statusText);
        }
      })
      .catch(error => {
        console.error('Erro ao editar carro:', error);
      });
  } else {
    fetch("http://localhost:3000/carros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
        alert("Carro cadastrado com sucesso!");
        montaTabela();
        limparFormulario();
      })
      .catch(error => {
        console.error("Erro ao cadastrar carro:", error);
        res.status(500).json({
          error: "Erro ao cadastrar o carro"
        });
      });
  }
});