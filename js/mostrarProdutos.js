import { conectaApi } from "./conectaApi.js";

const produtos = document.querySelector('[data-lista]');

function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function constroiCard(imagem, nome, preco, id) {
  const item = document.createElement('li');
  item.className = "produtos-cards";
  item.dataset.id = id; // Add product ID a data attribute
  item.innerHTML = `<img class="imagem-produtos" src=${imagem}>
                         <p class="nome-produto">${nome.toUpperCase()}</p>
                         <div class="preco-delete">
                           <p class="preco-produto">${formatarPreco(preco)}</p>
                           <img class="delete-btn" src="img/delet.png" alt="Delete Product">
                         </div>`;
  return item;
}

async function listaProdutos() {
  const listaApi = await conectaApi.listaProdutos();

  listaApi.forEach(element => {
    const card = constroiCard(element.imagem, element.nome, element.preco, element.id);
    produtos.appendChild(card);
  });

  // Adiciona o event listener para remover produtos
  produtos.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const card = event.target.closest('.produtos-cards');
      const productId = card.dataset.id; //Use o atributo data para obter o ID

      // Confirmação antes da exclusão (opcional)
      if (confirm(`Tem certeza que deseja excluir o produto "${card.querySelector('.nome-produto').textContent}"?`)) {
        try {
          await conectaApi.deletaProduto(productId); // Chame a função de exclusão da API

          // Remover da interface somente após exclusão bem-sucedida
          card.remove();

          // Atualize a matriz na memória, se necessário (considere atualizações em tempo real)
          const listaApiIndex = listaApi.findIndex(produto => produto.id === productId);
          if (listaApiIndex !== -1) {
            listaApi.splice(listaApiIndex, 1);
          }
        } catch (error) {
          console.error('Erro ao deletar produto:', error);
          alert('Falha ao excluir o produto. Tente novamente mais tarde.');
        }
      }
    }
  });
}

function limparFormulario() {
  const form = document.querySelector('.formulario');
  form.reset();
}


listaProdutos();