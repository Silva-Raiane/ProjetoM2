const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const Nome = document.querySelector('#name');
const Funcao = document.querySelector('#funcao');
const Idade = document.querySelector('#idade');
const Salario = document.querySelector('#salario');
const btnSalvar = document.querySelector('#btnSalvar');
const pesquisaInput = document.querySelector('#pesquisa');
const btnPesquisar = document.querySelector('#btnPesquisar');
const modalSobre = document.getElementById('modalSobre');
const modalAjuda = document.getElementById('modalAjuda');
const abrirSobreBtn = document.getElementById('abrirSobre');
const abrirAjudaBtn = document.getElementById('abrirDialogAjuda');
const fecharSobreBtn = document.getElementById('fecharSobre');
const fecharAjudaBtn = document.getElementById('fecharAjuda');

/* variaveis itens armazena os itens do banco, id que armazena os dados para edição*/
let itens
let id

/***/
class Colaborador {
  constructor(nome, funcao, idade, salario) {
    this.nome = nome;
    this.funcao = funcao;
    this.idade = idade;
    this.salario = salario;
  }
}

function login(){
    alert("Você está logado!");
}
function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  }

  if (edit) {
    Nome.value = itens[index].nome;
    Funcao.value = itens[index].funcao;
    Idade.value = itens[index].idade;
    Salario.value = itens[index].salario;
    id = index
  } else {
    Nome.value = '';
    Funcao.value = '';
    Idade.value = '';
    Salario.value = '';
  }

}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

/***/
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>${item.idade}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class="fa-solid fa-trash"></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  if (Nome.value == '' || Funcao.value == '' || Idade.value == '' || Salario.value == '') {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id] = new Colaborador(Nome.value, Funcao.value, Idade.value, Salario.value);
  } else {
    const novoColaborador = new Colaborador(Nome.value, Funcao.value, Idade.value, Salario.value);
    itens.push(novoColaborador);
  }

  setItensBD();

  modal.classList.remove('active');
  loadItens();
  id = undefined;
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}


const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

btnPesquisar.addEventListener('click', () => {
  const termoPesquisa = pesquisaInput.value.toLowerCase();
  const itensFiltrados = itens.filter(item => {
    const nome = item.nome.toLowerCase();
    const funcao = item.funcao.toLowerCase();
})
  });

pesquisaInput.addEventListener('input', function () {
  const termoPesquisa = pesquisaInput.value.toLowerCase(); // Obtém o texto da pesquisa em letras minúsculas

  const itensFiltrados = itens.filter(item => {
    // Filtra os itens com base no texto de pesquisa
    const nomeLowerCase = item.nome.toLowerCase();
    const funcaoLowerCase = item.funcao.toLowerCase();
    return nomeLowerCase.includes(termoPesquisa) || funcaoLowerCase.includes(termoPesquisa);
  });

  // Limpa a tabela
  tbody.innerHTML = '';

  // Insere os itens filtrados na tabela
  itensFiltrados.forEach((item, index) => {
    insertItem(item, index);
  });

});

//Dialog sobre o site e ajuda
abrirSobreBtn.addEventListener('click', () => {
  modalSobre.showModal();
});
fecharSobreBtn.addEventListener('click', () => {
  modalSobre.close();
});
abrirAjudaBtn.addEventListener('click', () => {
  modalAjuda.showModal();
});
fecharAjudaBtn.addEventListener('click', () => {
  modalAjuda.close();
});

function logout() {
  alert('Você foi desconectado com sucesso!');
  // Redirecionar para a página de login:
  window.location.href = './src/pagina-de-login.html';
}
const logoutBtn = document.getElementById('logout');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logout();
  });
}