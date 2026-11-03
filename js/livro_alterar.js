document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");
    buscar(id);
});

async function buscar(id) {
    const retorno = await fetch("../php/livro_get.php?id=" + id);
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        var registro = resposta.data[0];
        document.getElementById("titulo").value = registro.titulo;
        document.getElementById("autor").value = registro.autor;
        document.getElementById("editora").value = registro.editora;
        document.getElementById("ano").value = registro.ano;
        document.getElementById("genero").value = registro.genero;
        document.getElementById("numero_paginas").value = registro.numero_paginas;
        document.getElementById("id").value = id;
    } else {
        alert("ERRO:" + resposta.mensagem);
        window.location.href = "index_livros.html";
    }
}

document.getElementById("enviar").addEventListener("click", () => {
    alterar();
});

async function alterar() {
    var titulo = document.getElementById("titulo").value;
    var autor = document.getElementById("autor").value;
    var editora = document.getElementById("editora").value;
    var ano = document.getElementById("ano").value;
    var genero = document.getElementById("genero").value;
    var numero_paginas = document.getElementById("numero_paginas").value;
    var id = document.getElementById("id").value;

    const fd = new FormData();
    fd.append("titulo", titulo);
    fd.append("autor", autor);
    fd.append("editora", editora);
    fd.append("ano", ano);
    fd.append("genero", genero);
    fd.append("numero_paginas", numero_paginas);

    const retorno = await fetch("../php/livro_alterar.php?id=" + id, {
        method: 'POST',
        body: fd
    });
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = "index_livros.html";
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
