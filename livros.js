let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#caixa-busca");
let dados  = [];

async function iniciarBusca() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch("livros.json");
            dados = await resposta.json();
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        return;
    }
}
   
const termoBusca = campoBusca.value.toLowerCase();
const dadosFiltrados = dados.filter(dado =>
    (dado.nome || "").toLowerCase().includes(termoBusca) ||
    (dado.ano || "").toString().includes(termoBusca) ||
    (dado.descrição || "").toLowerCase().includes(termoBusca) ||
    (dado.autora || "").toLowerCase().includes(termoBusca)
);
renderizarCards(dadosFiltrados);

    // Removido código duplicado que carregava e renderizava tudo novamente
} 

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h3>${dado.nome}</h3>
        <p><strong>Autora:</strong> ${dado.autora}</p>
        <p>${dado.ano}</p>
        <p>${dado.descrição}</p>
         `
        cardContainer.appendChild(article);
    }
}

function buscar() {
    const termoBusca = campoBusca.value.toLowerCase();

    const dadosFiltrados = dados.filter(dado => {
        return (dado.nome || "").toLowerCase().includes(termoBusca) ||
               (dado.ano || "").toString().includes(termoBusca) ||
               (dado.descrição || "").toLowerCase().includes(termoBusca) ||
               (dado.autora || "").toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

// A função carregarDados foi renomeada para iniciarBusca e chamada pelo botão
// Para carregar os dados inicialmente, podemos chamar a função aqui ou deixar que o primeiro clique em "Buscar" faça isso.
// Vamos manter a lógica de carregar ao buscar.

campoBusca.addEventListener("input", buscar);