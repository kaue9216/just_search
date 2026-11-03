var registros = [];

document.addEventListener("DOMContentLoaded", () => {
    buscar();
});

document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "filme_novo.html";
});

document.getElementById("btn_busca").addEventListener("click", () => {
    filtrar();
});

async function buscar(){
    const retorno = await fetch("../php/filme_get.php");
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        registros = resposta.data;
        preencherLista(registros);
        preencherCategorias(registros);
    }
    else{
        document.getElementById("lista").innerHTML = "<p class='vazio'>Nenhum filme encontrado.</p>";
    }
}

function filtrar(){
    var termo = document.getElementById("busca").value.toLowerCase();
    var achados = [];
    for(var i=0;i<registros.length;i++){
        var texto = (registros[i].titulo + " " + registros[i].diretor + " " + registros[i].genero + " " + registros[i].sinopse).toLowerCase();
        if(texto.indexOf(termo) != -1){
            achados.push(registros[i]);
        }
    }
    preencherLista(achados);
}

async function excluir(id){
    if(confirm("Deseja realmente excluir este filme?") == false){
        return;
    }
    const retorno = await fetch("../php/filme_excluir.php?id=" + id);
    const resposta = await retorno.json();
    alert(resposta.mensagem);
    if(resposta.status == "ok"){
        window.location.reload();
    }
}

function preencherLista(tabela){
    if(tabela.length == 0){
        document.getElementById("lista").innerHTML = "<p class='vazio'>Nenhum filme encontrado.</p>";
        return;
    }
    var html = `<ul class="resultados">`;
    for(var i=0;i<tabela.length;i++){
        var titulo = tabela[i].titulo;
        if(tabela[i].ano){
            titulo += " (" + tabela[i].ano + ")";
        }
        html += `
            <li class="resultado">
                <div class="info">
                    <h3>${titulo}</h3>
                    <span class="meta">${tabela[i].diretor + " · " + tabela[i].genero}</span>
                    <p>${tabela[i].sinopse}</p>
                    <div class="acoes">
                        <a href="filme_alterar.html?id=${tabela[i].id}">Alterar</a>
                        <a href="#" class="perigo" onclick="excluir(${tabela[i].id})">Excluir</a>
                    </div>
                </div>
            </li>`;
    }
    html += `</ul>`;
    document.getElementById("lista").innerHTML = html;
}

function preencherCategorias(tabela){
    var lista = [];
    for(var i=0;i<tabela.length;i++){
        if(lista.indexOf(tabela[i].genero) == -1){
            lista.push(tabela[i].genero);
        }
    }
    var html = "";
    for(var i=0;i<lista.length;i++){
        html += `<li><a href="#" onclick="categoria('${lista[i]}')">${lista[i]}</a></li>`;
    }
    document.getElementById("generos").innerHTML = html;
}

function categoria(nome){
    document.getElementById("busca").value = nome;
    filtrar();
}
