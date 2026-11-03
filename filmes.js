document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    buscar();
});

document.getElementById("novo").addEventListener("click", () => {
    window.location.href = 'filmes_novo.html';
});

document.getElementById("logoff").addEventListener("click", () => {
    logoff();
});

// Pesquisa: clique na lupa ou Enter no campo
document.getElementById("btn_busca").addEventListener("click", () => {
    buscar(document.getElementById("busca").value);
});

document.getElementById("busca").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        buscar(document.getElementById("busca").value);
    }
});

async function logoff() {
    const retorno = await fetch("../php/cliente_logoff.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        window.location.href = '../login/';
    }
}

async function buscar(termo = "") {
    var url = "../php/filme_get.php";
    if (termo != "") {
        url += "?busca=" + encodeURIComponent(termo);
    }
    const retorno = await fetch(url);
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        preencherLista(resposta.data);
        if (termo == "") {
            preencherGeneros(resposta.data);
        }
    } else {
        document.getElementById("lista").innerHTML =
            "<p class='vazio'>Nenhum filme encontrado.</p>";
        if (termo == "") {
            document.getElementById("generos").innerHTML = "";
        }
    }
}

async function excluir(id) {
    if (!confirm("Deseja realmente excluir este filme?")) {
        return;
    }
    const retorno = await fetch("../php/filme_excluir.php?id=" + id);
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
    var html = `<ul class="resultados">`;

    for (var i = 0; i < tabela.length; i++) {
        var f = tabela[i];
        var capa = f.capa
            ? `<img src="../uploads/${escapar(f.capa)}" alt="Capa de ${escapar(f.titulo)}">`
            : `<span class="sem-capa">sem capa</span>`;
        var ano = f.ano ? ` (${escapar(f.ano)})` : "";

        html += `
            <li class="resultado">
                <div class="capa">${capa}</div>
                <div class="info">
                    <h3>${escapar(f.titulo)}${ano}</h3>
                    <span class="meta">${escapar(f.diretor)} · ${escapar(f.genero)}</span>
                    <p>${escapar(f.sinopse)}</p>
                    <div class="acoes">
                        <a href='filmes_alterar.html?id=${f.id}'>Alterar</a>
                        <a href='#' class="perigo" onclick='excluir(${f.id}); return false;'>Excluir</a>
                    </div>
                </div>
            </li>`;
    }

    html += `</ul>`;
    document.getElementById("lista").innerHTML = html;
}

// Barra lateral: lista os gêneros cadastrados
function preencherGeneros(tabela) {
    var contagem = {};
    for (var i = 0; i < tabela.length; i++) {
        var c = tabela[i].genero;
        contagem[c] = (contagem[c] || 0) + 1;
    }
    var generos = Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]);

    var html = "";
    for (var j = 0; j < generos.length; j++) {
        html += `<li><a href="#" data-genero="${escapar(generos[j])}">${escapar(generos[j])}</a></li>`;
    }
    var lista = document.getElementById("generos");
    lista.innerHTML = html;

    lista.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            var cat = link.getAttribute("data-genero");
            document.getElementById("busca").value = cat;
            buscar(cat);
        });
    });
}
