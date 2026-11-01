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
    }
}

async function excluir(id) {
    const retorno = await fetch("../php/artigo_excluir.php?id=" + id);
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert(resposta.mensagem);
        window.location.reload();
    } else {
        alert(resposta.mensagem);
    }
}

function preencherTabela(tabela) {
    var html = `
        <table>
            <tr>
                <th> Titulo </th>
                <th> Conteudo </th>
                <th> Autor </th>
                <th> Ações </th>
            </tr>`;
    for (var i = 0; i < tabela.length; i++) {
        html += `
            <tr>
                <td>${tabela[i].titulo}</td>
                <td>${tabela[i].conteudo}</td>
                <td>${tabela[i].autor}</td>
                <td>
                    <a href='artigos_alterar.html?id=${tabela[i].id}'>Alterar</a>
                    <a href='#' onclick='excluir(${tabela[i].id})'>Excluir</a>
                </td>
            </tr>
        `;
    }
    html += '</table>';
    document.getElementById("lista").innerHTML = html;
}
