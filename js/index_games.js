document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    buscar();
});

document.getElementById("novo").addEventListener("click", () => {
    window.location.href = 'games_novo.html';
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
    try {
        const retorno = await fetch("../php/game_get.php");
        const resposta = await retorno.json();
        if (resposta.status == "ok") {
            preencherTabela(resposta.data);
        } else {
            document.getElementById("lista").innerHTML = "<p class='empty-msg'>" + resposta.mensagem + "</p>";
        }
    } catch (erro) {
        // Acontece quando o PHP não roda (página aberta sem Apache) ou devolve erro em vez de JSON
        document.getElementById("lista").innerHTML = "<p class='empty-msg'>Erro ao buscar os dados. Verifique se o Apache/MySQL estão ligados, se a página foi aberta por http://localhost/... e se o banco.sql foi importado.</p>";
        console.error(erro);
    }
}

async function excluir(id) {
    const retorno = await fetch("../php/game_excluir.php?id=" + id);
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
            <thead>
                <tr>
                    <th> Título </th>
                    <th> Conteúdo / Descrição </th>
                    <th> Autor / Desenvolvedor </th>
                    <th> Ações </th>
                </tr>
            </thead>
            <tbody>`;
    for (var i = 0; i < tabela.length; i++) {
        html += `
            <tr>
                <td>${tabela[i].titulo}</td>
                <td>${tabela[i].conteudo}</td>
                <td>${tabela[i].autor}</td>
                <td>
                    <a href='games_alterar.html?id=${tabela[i].id}' class='btn-action edit'>Alterar</a>
                    <a href='#' onclick='excluir(${tabela[i].id})' class='btn-action delete'>Excluir</a>
                </td>
            </tr>
        `;
    }
    html += '</tbody></table>';
    document.getElementById("lista").innerHTML = html;
}