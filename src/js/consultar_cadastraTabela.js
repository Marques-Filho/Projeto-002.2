let soma = 0
let inputMARCA = document.getElementById('marca').value;
let inputMODELO = document.getElementById('modelo').value;
let inputCOR = document.getElementById('cor').value;
let inputANO = document.getElementById('ano').value;
let inputVALOR = document.getElementById('valor').value;


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

  fetch(`http://localhost:3000/carros/${id}`)
    .then(response => response.json())
    .then(carro => {
      if (carro) {
        alert("Este carro já está cadastrado.");
      } else {
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
    })
    .catch(error => {
      console.error("Erro ao verificar carro existente:", error);
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
}

function limparFormulario() {
  document.getElementById("id").value = "";
  document.getElementById("marca").value = "";
  document.getElementById("modelo").value = "";
  document.getElementById("cor").value = "";
  document.getElementById("ano").value = "";
  document.getElementById("valor").value = "";
}

function editarCarro(id, marca, modelo, cor, ano, valor) {
  // Preenche os campos com os valores do carro a ser editado
  document.getElementById('marca').value = marca;
  document.getElementById('modelo').value = modelo;
  document.getElementById('cor').value = cor;
  document.getElementById('ano').value = ano;
  document.getElementById('valor').value = valor;

  editID = id;
  document.getElementById('id').style.display = 'none';
  document.getElementById('ids').style.display = 'none';
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

  fetch("http://localhost:3000/carros")
    .then(response => response.json())
    .then(carros => {
      let carroExistente = carros.find(carro => 
        carro.marca === inputMARCA && 
        carro.modelo === inputMODELO &&
        carro.cor === inputCOR &&
        carro.ano === inputANO &&
        carro.valor === inputVALOR
      );
      if (carroExistente && editID === null) {
        alert("Este carro já está cadastrado.");
      } else {
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
                editID = null;
                document.getElementById('id').style.display = 'inline'; // Restaura a exibição do input ID
                document.getElementById('ids').style.display = 'inline'; // Restaura a exibição do label ID
                document.getElementById('btn-consultar1').innerText = "Cadastrar";
              } else {
                console.error('Erro ao editar carro:', resposta.statusText);
              }
            })
            .catch(error => {
              console.error('Erro ao editar carro:', error);
            });
        } else {
          // Cadastra o novo carro
          fetch("http://localhost:3000/carros", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Erro ao cadastrar carro');
              }
            })
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
      }
    })
    .catch(error => {
      console.error("Erro ao buscar carros:", error);
    });
});