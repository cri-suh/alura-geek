async function listaProdutos() {
    const conexao = await fetch("http://localhost:3000/Produtos");
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
    
}

async function criaProdutos(nome, preco, imagem) {
    const conexao = await fetch("http://localhost:3000/Produtos",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            preco: preco,
            imagem: imagem
        })
    });
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function deletaProduto(id) {
    try {
        const conexao = await fetch(`http://localhost:3000/Produtos/${id}`, {
            method: 'DELETE'
        });

        if (!conexao.ok) {
            throw new Error('Erro ao deletar produto');
        }

        console.log('Produto deletado com sucesso!');
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
    }
}

export const conectaApi = {
    listaProdutos,
    criaProdutos,
    deletaProduto
}