document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");
    buscar(id);
});

async function buscar(id){
    const retorno = await fetch("../php/filme_get.php?id=" + id);
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        var registro = resposta.data[0];
        document.getElementById("titulo").value = registro.titulo;
        document.getElementById("diretor").value = registro.diretor;
        document.getElementById("genero").value = registro.genero;
        document.getElementById("sinopse").value = registro.sinopse;
        document.getElementById("ano").value = registro.ano;
        document.getElementById("id").value = id;
    }
    else{
        alert("ERRO: " + resposta.mensagem);
        window.location.href = "index_filmes.html";
    }
}

document.getElementById("enviar").addEventListener("click", () => {
    alterar();
});

async function alterar(){
    var titulo = document.getElementById("titulo").value;
    var diretor = document.getElementById("diretor").value;
    var genero = document.getElementById("genero").value;
    var sinopse = document.getElementById("sinopse").value;
    var ano = document.getElementById("ano").value;
    var id = document.getElementById("id").value;

    const fd = new FormData();
    fd.append("titulo", titulo);
    fd.append("diretor", diretor);
    fd.append("genero", genero);
    fd.append("sinopse", sinopse);
    fd.append("ano", ano);

    const retorno = await fetch("../php/filme_alterar.php?id=" + id,
        {
          method: "POST",
          body: fd
        });
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert("SUCESSO: " + resposta.mensagem);
        window.location.href = "index_filmes.html";
    }
    else{
        alert("ERRO: " + resposta.mensagem);
    }
}
