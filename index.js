document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    buscar();
});

document.getElementById("novo").addEventListener("click", () => {
    window.location.href = 'artigos_novo.html';
});

document.getElementById("logoff").addEventListener("click", () => {
    logoff();
});

async function logoff() {
    const retorno = await fetch("../php/cliente_logoff.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        window.location.href = '../login/';
    }
}

async function buscar() {
    const retorno = await fetch("../php/artigo_get.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        preencherTabela(resposta.data);
    } else {
        document.getElementById("lista").innerHTML = "<p class='vazio'>Nenhum artigo cadastrado.</p>";
    }
}

async function excluir(id) {
    if (!confirm("Deseja realmente excluir este artigo?")) {
        return;
    }
    const retorno = await fetch("../php/artigo_excluir.php?id=" + id);
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert(resposta.mensagem);
        window.location.reload();
    } else {
        alert(resposta.mensagem);
    }
}

function escapar(texto) {
    if (texto === null || texto === undefined) return "";
    return String(texto)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function preencherTabela(tabela) {
    var html = `
        <table class="tabela">
            <tr>
                <th>Título</th>
                <th>Conteúdo</th>
                <th>Autor</th>
                <th>Ações</th>
            </tr>`;
    for (var i = 0; i < tabela.length; i++) {
        html += `
            <tr>
                <td>${escapar(tabela[i].titulo)}</td>
                <td>${escapar(tabela[i].conteudo)}</td>
                <td>${escapar(tabela[i].autor)}</td>
                <td class="acoes">
                    <a href='artigos_alterar.html?id=${tabela[i].id}'>Alterar</a>
                    <a href='#' class="perigo" onclick='excluir(${tabela[i].id}); return false;'>Excluir</a>
                </td>
            </tr>`;
    }
    html += '</table>';
    document.getElementById("lista").innerHTML = html;
}
