// Fase 1: ao abrir a página, lê o id da URL (?id=X) e carrega a série
document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");
    buscar(id);
});

async function buscar(id) {
    const retorno = await fetch("../php/serie_get.php?id=" + id);
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        // O PHP devolve uma lista; com id ela tem só uma série
        var registro = resposta.data[0];
        document.getElementById("titulo").value = registro.titulo;
        document.getElementById("autor").value = registro.autor;
        document.getElementById("categoria").value = registro.categoria;
        document.getElementById("ano").value = registro.ano;
        document.getElementById("id").value = id;
    } else {
        alert("ERRO:" + resposta.mensagem);
        window.location.href = "index_series.html";
    }
}

// Fase 2: ao clicar em Enviar, manda as alterações para o PHP
document.getElementById("enviar").addEventListener("click", () => {
    alterar();
});

async function alterar() {
    var titulo = document.getElementById("titulo").value;
    var autor = document.getElementById("autor").value;
    var categoria = document.getElementById("categoria").value;
    var ano = document.getElementById("ano").value;
    var id = document.getElementById("id").value;

    const fd = new FormData();
    fd.append("titulo", titulo);
    fd.append("autor", autor);
    fd.append("categoria", categoria);
    fd.append("ano", ano);

    // O id vai na URL ($_GET) e os dados vão no corpo ($_POST)
    const retorno = await fetch("../php/serie_alterar.php?id=" + id, {
        method: 'POST',
        body: fd
    });
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = "index_series.html";
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
