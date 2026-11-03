// Lista com pesquisa e barra lateral de desenvolvedores (mesmo molde de filmes).
// A pesquisa filtra os registros já carregados, sem nova chamada ao PHP.
var registros = [];

document.addEventListener("DOMContentLoaded", () => {
    buscar();
});

document.getElementById("novo").addEventListener("click", () => {
    window.location.href = 'games_novo.html';
});

// Pesquisa: clique na lupa ou Enter no campo
document.getElementById("btn_busca").addEventListener("click", () => {
    filtrar(document.getElementById("busca").value);
});

document.getElementById("busca").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        filtrar(document.getElementById("busca").value);
    }
});

async function buscar() {
    try {
        const retorno = await fetch("../php/game_get.php");
        const resposta = await retorno.json();
        if (resposta.status == "ok") {
            registros = resposta.data;
            preencherLista(registros);
            preencherCategorias(registros);
        } else {
            document.getElementById("lista").innerHTML =
                "<p class='vazio'>Nenhum game encontrado.</p>";
            document.getElementById("generos").innerHTML = "";
        }
    } catch (erro) {
        document.getElementById("lista").innerHTML =
            "<p class='vazio'>Erro ao buscar os dados. Verifique o Apache/MySQL e se o banco.sql foi importado.</p>";
        console.error(erro);
    }
}

// Filtra a lista carregada pelo texto digitado
function filtrar(termo) {
    var t = termo.trim().toLowerCase();
    var campos = ["titulo", "conteudo", "autor"];
    var achados = registros.filter((r) =>
        campos.some((c) => String(r[c] ?? "").toLowerCase().includes(t))
    );
    preencherLista(achados);
}

async function excluir(id) {
    if (!confirm("Deseja realmente excluir este game?")) {
        return;
    }
    const retorno = await fetch("../php/game_excluir.php?id=" + id);
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert(resposta.mensagem);
        window.location.reload();
    } else {
        alert(resposta.mensagem);
    }
}

// Evita que textos do banco quebrem o HTML (proteção contra XSS)
function escapar(texto) {
    if (texto === null || texto === undefined) return "";
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function preencherLista(tabela) {
    if (tabela.length == 0) {
        document.getElementById("lista").innerHTML =
            "<p class='vazio'>Nenhum game encontrado.</p>";
        return;
    }

    var html = `<ul class="resultados">`;

    for (var i = 0; i < tabela.length; i++) {
        var r = tabela[i];
        var extra = "";
        var meta = escapar(r.autor);
        var descricao = `<p>${escapar(r.conteudo)}</p>`;
        html += `
            <li class="resultado">
                <div class="info">
                    <h3>${escapar(r.titulo)}${extra}</h3>
                    <span class="meta">${meta}</span>
                    ${descricao}
                    <div class="acoes">
                        <a href='games_alterar.html?id=${r.id}'>Alterar</a>
                        <a href='#' class="perigo" onclick='excluir(${r.id}); return false;'>Excluir</a>
                    </div>
                </div>
            </li>`;
    }

    html += `</ul>`;
    document.getElementById("lista").innerHTML = html;
}

// Barra lateral: lista os desenvolvedores cadastrados (mais frequentes primeiro)
function preencherCategorias(tabela) {
    var contagem = {};
    for (var i = 0; i < tabela.length; i++) {
        var c = tabela[i].autor;
        contagem[c] = (contagem[c] || 0) + 1;
    }
    var itens = Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]);

    var html = "";
    for (var j = 0; j < itens.length; j++) {
        html += `<li><a href="#" data-cat="${escapar(itens[j])}">${escapar(itens[j])}</a></li>`;
    }
    var lista = document.getElementById("generos");
    lista.innerHTML = html;

    lista.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            var cat = link.getAttribute("data-cat");
            document.getElementById("busca").value = cat;
            filtrar(cat);
        });
    });
}
