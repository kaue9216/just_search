var registros = [];

document.addEventListener("DOMContentLoaded", () => {
    buscar();
});

document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "games_novo.html";
});

document.getElementById("btn_busca").addEventListener("click", () => {
    filtrar();
});

async function buscar() {
    const retorno = await fetch("../php/game_get.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        registros = resposta.data;
        preencherLista(registros);
        preencherCategorias(registros);
    } else {
        document.getElementById("lista").innerHTML = "<p class='vazio'>Nenhum game encontrado.</p>";
    }
}

function filtrar() {
    var termo = document.getElementById("busca").value.toLowerCase();
    var achados = [];
    for (var i = 0; i < registros.length; i++) {
        var texto = (registros[i].titulo + " " + registros[i].conteudo + " " + registros[i].autor).toLowerCase();
        if (texto.indexOf(termo) != -1) {
            achados.push(registros[i]);
        }
    }
    preencherLista(achados);
}

async function excluir(id) {
    if (confirm("Deseja realmente excluir este game?") == false) {
        return;
    }
    const retorno = await fetch("../php/game_excluir.php?id=" + id);
    const resposta = await retorno.json();
    alert(resposta.mensagem);
    if (resposta.status == "ok") {
        window.location.reload();
    }
}

function preencherLista(tabela) {
    if (tabela.length == 0) {
        document.getElementById("lista").innerHTML = "<p class='vazio'>Nenhum game encontrado.</p>";
        return;
    }
    var html = `<ul class="resultados">`;
    for (var i = 0; i < tabela.length; i++) {
        var titulo = tabela[i].titulo;
        html += `
            <li class="resultado">
                <div class="info">
                    <h3>${titulo}</h3>
                    <span class="meta">${tabela[i].autor}</span>
                    <p>${tabela[i].conteudo}</p>
                    <div class="acoes">
                        <a href="games_alterar.html?id=${tabela[i].id}">Alterar</a>
                        <a href="#" class="perigo" onclick="excluir(${tabela[i].id})">Excluir</a>
                    </div>
                </div>
            </li>`;
    }
    html += `</ul>`;
    document.getElementById("lista").innerHTML = html;
}

function preencherCategorias(tabela) {
    var lista = [];
    for (var i = 0; i < tabela.length; i++) {
        if (lista.indexOf(tabela[i].autor) == -1) {
            lista.push(tabela[i].autor);
        }
    }
    var html = "";
    for (var i = 0; i < lista.length; i++) {
        html += `<li><a href="#" onclick="categoria('${lista[i]}')">${lista[i]}</a></li>`;
    }
    document.getElementById("generos").innerHTML = html;
}

function categoria(nome) {
    document.getElementById("busca").value = nome;
    filtrar();
}
