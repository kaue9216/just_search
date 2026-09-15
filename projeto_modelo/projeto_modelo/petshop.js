document.addEventListener("DOMContentLoaded", () => {
    verificaSessao();
    verificaAnimais();
    carregaRegistros();

    // Verificar se há informações vindas por GET
    const parametros = new URLSearchParams(window.location.search);
    const acao = parametros.get("acao");
    const id = parametros.get("id");

    // localhost/petshop.html
    const url = window.location.origin + window.location.pathname;

    // Só posso realizar as ações com essas duas informações
    if(acao !== null && id !== null){
        executaAcao(acao, id, url);
    }

    // Evento para adicionar animal
    document.getElementById("btnAdicionar").addEventListener("click", () => {
        var nomeAnimal = document.getElementById("nomeAnimal").value;
        var especie = document.getElementById("especie").value;
        var raca = document.getElementById("raca").value;
        var servico = document.getElementById("servico").value;

        if(nomeAnimal == "" || especie == ""){
            document.getElementById("msgForm").textContent = "Preencha nome e espécie.";
            return;
        }

        document.getElementById("msgForm").textContent = "";

        var usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

        var obj = {
            nomeAnimal: nomeAnimal,
            especie: especie,
            raca: raca,
            servico: servico,
            status: "aguardando",
            emailCliente: usuario.email,
            nomeCliente: usuario.nome
        };

        // passo 1
        var animais = JSON.parse(localStorage.getItem("animais"));
        animais.push(obj); // passo 2
        // passo 3
        localStorage.setItem("animais", JSON.stringify(animais));
        window.location.reload();
    });
});

function verificaSessao(){
    var usuario = localStorage.getItem("usuarioLogado");
    if(usuario == null){
        window.location.href = "index.html";
        return;
    }
    var obj = JSON.parse(usuario);
    document.getElementById("nomeUsuario").textContent = "Olá, " + obj.nome;
}

function verificaAnimais(){
    var animais = localStorage.getItem("animais");
    if(animais == null){
        localStorage.setItem("animais", JSON.stringify([]));
    }
}

function carregaRegistros(){
    var usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    var animais = JSON.parse(localStorage.getItem("animais"));

    // Filtra somente os animais do usuário logado
    var meusAnimais = [];
    animais.forEach((item, index) => {
        if(item.emailCliente == usuario.email){
            meusAnimais.push({ item: item, index: index });
        }
    });

    if(meusAnimais.length == 0){
        document.getElementById("listaAnimais").innerHTML =
            `<div class="text-center text-muted py-4">
                <i class="fa-solid fa-paw fa-2x mb-2"></i>
                <p>Nenhum animal cadastrado ainda.</p>
             </div>`;
        return;
    }

    var tabelaP1 = `<div class="table-responsive">
                    <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th><i class="fa-solid fa-paw me-1"></i> Animal</th>
                            <th>Espécie</th>
                            <th>Raça</th>
                            <th>Serviço</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

    var tabelaP2 = `</tbody>
                    </table>
                    </div>`;

    var tabelaMeio = "";
    meusAnimais.forEach((registro) => {
        var item = registro.item;
        var index = registro.index;

        tabelaMeio += `<tr>
                            <td><strong>${item.nomeAnimal}</strong></td>
                            <td>${item.especie}</td>
                            <td>${item.raca != "" ? item.raca : "-"}</td>
                            <td>${item.servico}</td>
                            <td>${badgeStatus(item.status)}</td>
                            <td>
                                <a href='petshop.html?id=${index}&acao=alterar' class="btn btn-outline-primary btn-acao me-1">
                                    <i class="fa-solid fa-pen"></i> Editar
                                </a>
                                <a href='petshop.html?id=${index}&acao=excluir' class="btn btn-outline-danger btn-acao">
                                    <i class="fa-solid fa-trash"></i> Excluir
                                </a>
                            </td>
                        </tr>`;
    });

    var tabelaFinal = tabelaP1 + tabelaMeio + tabelaP2;
    document.getElementById("listaAnimais").innerHTML = tabelaFinal;
}

function executaAcao(acao, indice, url){
    // PRIMEIRO PASSO
    var animais = JSON.parse(localStorage.getItem("animais"));

    if(acao == 'excluir'){
        animais.splice(indice, 1);
        alert("Animal excluído com sucesso!");

        // ULTIMO PASSO
        localStorage.setItem("animais", JSON.stringify(animais));
        window.location.href = url; // RECARREGA A TELA

    }else if(acao == 'alterar'){
        // Carrega valores nos inputs
        var obj = animais[indice];
        document.getElementById("nomeAnimal").value = obj.nomeAnimal;
        document.getElementById("especie").value = obj.especie;
        document.getElementById("raca").value = obj.raca;
        document.getElementById("servico").value = obj.servico;
        document.getElementById("btnAdicionar").disabled = true;

        // Insere o botão Salvar na tela
        document.getElementById("btnSalvar").style.display = "inline-block";

        // Escuta o botão salvar
        document.getElementById("btnSalvar").addEventListener("click", () => {
            animais[indice].nomeAnimal = document.getElementById("nomeAnimal").value;
            animais[indice].especie = document.getElementById("especie").value;
            animais[indice].raca = document.getElementById("raca").value;
            animais[indice].servico = document.getElementById("servico").value;
            localStorage.setItem("animais", JSON.stringify(animais));
            window.location.href = url;
        });

    }else if(acao == 'status'){
        // Atualizar status do animal
        var novoStatus = indice.split("_")[1];
        var idx = indice.split("_")[0];
        animais[idx].status = novoStatus;
        localStorage.setItem("animais", JSON.stringify(animais));
        window.location.href = url;

    }else{
        console.log("Algo deu muito errado");
    }
}

function badgeStatus(status){
    var labels = {
        aguardando: "Aguardando",
        em_atendimento: "Em Atendimento",
        pronto: "Pronto para retirada",
        entregue: "Entregue"
    };

    var label = labels[status] != undefined ? labels[status] : status;
    return `<span class="badge-status status-${status}">${label}</span>`;
}

function sair(){
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}
