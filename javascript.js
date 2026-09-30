// =======================
// ELEMENTOS DOM
// =======================

const inputTitulo = document.querySelector("#input-titulo");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaFilmes = document.querySelector("#lista-filmes");
const mensagem = document.querySelector("#mensagem");

// =======================
// ESTADO DA APLICAÇÃO
// =======================

let filmes = [];

// =======================
// SALVAR FILMES
// =======================

function salvarFilmes() {

    localStorage.setItem(
        "meus_filmes",
        JSON.stringify(filmes)
    );

}

// =======================
// CARREGAR FILMES
// =======================

function carregarFilmes() {

    const filmesSalvos =
        localStorage.getItem("meus_filmes");

    if (filmesSalvos) {

        filmes = JSON.parse(filmesSalvos);

    }

}

// =======================
// ADICIONAR FILME
// =======================

function adicionarFilme() {

    const titulo =
        inputTitulo.value.trim();

    if (titulo === "") {

        mensagem.textContent =
            "Digite um título válido.";

        mensagem.className =
            "mensagem erro";

        return;
    }

    const novoFilme = {

        id: Date.now(),

        titulo: titulo,

        assistido: false

    };

    filmes.push(novoFilme);

    salvarFilmes();

    inputTitulo.value = "";

    mensagem.textContent =
        "Filme cadastrado com sucesso!";

    mensagem.className =
        "mensagem sucesso";

    renderizarFilmes();
}

// =======================
// ALTERAR STATUS
// =======================

function alternarAssistido(id) {

    const filme = filmes.find(
        filme => filme.id === id
    );

    if (filme) {

        filme.assistido =
            !filme.assistido;

        salvarFilmes();

        renderizarFilmes();
    }

}

// =======================
// EXCLUIR FILME
// =======================

function excluirFilme(id) {

    filmes = filmes.filter(
        filme => filme.id !== id
    );

    salvarFilmes();

    renderizarFilmes();
}

// =======================
// RENDERIZAR FILMES
// =======================

function renderizarFilmes() {

    listaFilmes.innerHTML = "";

    filmes.forEach(function(filme){

        const li =
            document.createElement("li");

        li.classList.add("filme");

        if (filme.assistido) {

            li.classList.add("assistido");

        }

        const span =
            document.createElement("span");

        span.classList.add("titulo-filme");

        span.textContent =
            filme.titulo;

        const btnStatus =
            document.createElement("button");

        btnStatus.classList.add("btn-status");

        btnStatus.textContent =
            filme.assistido
            ? "Assistido"
            : "Não Assistido";

        btnStatus.addEventListener(
            "click",
            function(){

                alternarAssistido(
                    filme.id
                );

            }
        );

        const btnExcluir =
            document.createElement("button");

        btnExcluir.classList.add("btn-excluir");

        btnExcluir.textContent =
            "Excluir";

        btnExcluir.addEventListener(
            "click",
            function(){

                excluirFilme(
                    filme.id
                );

            }
        );

        li.appendChild(span);
        li.appendChild(btnStatus);
        li.appendChild(btnExcluir);

        listaFilmes.appendChild(li);

    });

}

// =======================
// EVENTOS
// =======================

btnAdicionar.addEventListener(
    "click",
    adicionarFilme
);

inputTitulo.addEventListener(
    "keypress",
    function(event){

        if(event.key === "Enter"){

            adicionarFilme();

        }

    }
);

// =======================
// INICIALIZAÇÃO
// =======================

carregarFilmes();

renderizarFilmes();