document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");
    buscar(id);
});

async function buscar(id) {
    const retorno = await fetch("../php/artigo_get.php?id=" + id);
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        var registro = resposta.data[0];
        document.getElementById("titulo").value = registro.titulo;
        document.getElementById("conteudo").value = registro.conteudo;
        document.getElementById("autor").value = registro.autor;
        document.getElementById("id").value = id;
    } else {
        alert("ERRO:" + resposta.mensagem);
        window.location.href = "../home/";
    }
}

document.getElementById("enviar").addEventListener("click", () => {
    alterar();
});

async function alterar() {
    var titulo = document.getElementById("titulo").value;
    var conteudo = document.getElementById("conteudo").value;
    var autor = document.getElementById("autor").value;
    var id = document.getElementById("id").value;

    const fd = new FormData();
    fd.append("titulo", titulo);
    fd.append("conteudo", conteudo);
    fd.append("autor", autor);

    const retorno = await fetch("../php/artigo_alterar.php?id=" + id, {
        method: 'POST',
        body: fd
    });
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = '../home/';
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
