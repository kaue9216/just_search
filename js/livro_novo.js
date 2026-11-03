document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
});

document.getElementById("enviar").addEventListener("click", () => {
    novo();
});

async function novo() {
    var titulo = document.getElementById("titulo").value;
    var autor = document.getElementById("autor").value;
    var editora = document.getElementById("editora").value;
    var ano = document.getElementById("ano").value;
    var genero = document.getElementById("genero").value;
    var numero_paginas = document.getElementById("numero_paginas").value;

    const fd = new FormData();
    fd.append("titulo", titulo);
    fd.append("autor", autor);
    fd.append("editora", editora);
    fd.append("ano", ano);
    fd.append("genero", genero);
    fd.append("numero_paginas", numero_paginas);

    const retorno = await fetch("../php/livro_novo.php", {
        method: 'POST',
        body: fd
    });
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = "../livros/index_livros.html";
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
