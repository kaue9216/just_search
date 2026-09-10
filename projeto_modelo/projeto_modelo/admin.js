document.addEventListener("DOMContentLoaded", () => {
    verificaSessaoAdmin();
    carregaResumo();
    carregaRegistros("todos");

    // Verificar se há informações vindas por GET
    var parametros = new URLSearchParams(window.location.search);
    var acao = parametros.get("acao");
    var id = parametros.get("id");
    var filtroAtual = parametros.get("filtro");

    // admin.html
    var url = window.location.origin + window.location.pathname;

    // Só posso realizar as ações com essas duas informações
    if(acao !== null && id !== null){
        executaAcao(acao, id, url, filtroAtual);
    }

    // Reaplica filtro depois de uma ação (ex: voltar com ?filtro=aguardando)
    if(filtroAtual !== null && acao === null){
        carregaRegistros(filtroAtual);
        destacaBotaoFiltro(filtroAtual);
    }
});

function verificaSessaoAdmin(){
    var usuario = localStorage.getItem("usuarioLogado");
    if(usuario == null){
        window.location.href = "index.html";
        return;
    }
    var obj = JSON.parse(usuario);
    if(obj.perfil != "admin"){
        window.location.href = "petshop.html";
        return;
    }
    document.getElementById("nomeUsuario").textContent = "Olá, " + obj.nome;
}

function carregaResumo(){
    var animais = JSON.parse(localStorage.getItem("animais"));
    if(animais == null){ animais = []; }

    var contadores = { aguardando: 0, em_atendimento: 0, pronto: 0, entregue: 0 };
    animais.forEach((item) => {
        if(contadores[item.status] != undefined){
            contadores[item.status]++;
        }
    });

    var configs = [
        { status: "aguardando",     label: "Aguardando",       icon: "fa-clock",          cor: "warning" },
        { status: "em_atendimento", label: "Em Atendimento",   icon: "fa-scissors",       cor: "primary" },
        { status: "pronto",         label: "Pronto p/ Retirar",icon: "fa-circle-check",   cor: "success" },
        { status: "entregue",       label: "Entregue",         icon: "fa-house",          cor: "secondary" }
    ];

    var html = "";
    configs.forEach((c) => {
        html += `<div class="col-6 col-md-3">
                    <div class="card border-0 shadow-sm text-center p-3">
                        <div class="text-${c.cor} mb-1" style="font-size:1.8rem;">
                            <i class="fa-solid ${c.icon}"></i>
                        </div>
                        <div style="font-size:1.6rem;font-weight:700;">${contadores[c.status]}</div>
                        <div class="text-muted" style="font-size:0.8rem;">${c.label}</div>
                    </div>
                 </div>`;
    });

    document.getElementById("cardsResumo").innerHTML = html;
}

function carregaRegistros(filtro){
    var animais = JSON.parse(localStorage.getItem("animais"));
    if(animais == null){ animais = []; }

    var url = window.location.origin + window.location.pathname;

    var lista = [];
    animais.forEach((item, index) => {
        if(filtro == "todos" || item.status == filtro){
            lista.push({ item: item, index: index });
        }
    });

    if(lista.length == 0){
        document.getElementById("listaAnimais").innerHTML =
            `<div class="text-center text-muted py-4">
                <i class="fa-solid fa-paw fa-2x mb-2"></i>
                <p>Nenhum animal encontrado.</p>
             </div>`;
        return;
    }

    var tabelaP1 = `<div class="table-responsive">
                    <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Animal</th>
                            <th>Espécie</th>
                            <th>Serviço</th>
                            <th>Cliente</th>
                            <th>Status Atual</th>
                            <th>Alterar Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

    var tabelaP2 = `</tbody></table></div>`;

    var tabelaMeio = "";
    lista.forEach((registro) => {
        var item = registro.item;
        var index = registro.index;

        // Monta os botões de status — oculta o status atual
        var botoesStatus = montaBotoesStatus(index, item.status, filtro, url);

        tabelaMeio += `<tr>
                            <td><strong>${item.nomeAnimal}</strong><br><small class="text-muted">${item.raca != "" ? item.raca : ""}</small></td>
                            <td>${item.especie}</td>
                            <td>${item.servico}</td>
                            <td>
                                <i class="fa-solid fa-user me-1 text-secondary"></i>${item.nomeCliente}<br>
                                <small class="text-muted">${item.emailCliente}</small>
                            </td>
                            <td>${badgeStatus(item.status)}</td>
                            <td>${botoesStatus}</td>
                        </tr>`;
    });

    var tabelaFinal = tabelaP1 + tabelaMeio + tabelaP2;
    document.getElementById("listaAnimais").innerHTML = tabelaFinal;
}

function montaBotoesStatus(index, statusAtual, filtroAtual, url){
    var opcoes = [
        { valor: "aguardando",     label: "Aguardando",    cor: "warning"   },
        { valor: "em_atendimento", label: "Em Atendimento",cor: "primary"   },
        { valor: "pronto",         label: "Pronto",        cor: "success"   },
        { valor: "entregue",       label: "Entregue",      cor: "secondary" }
    ];

    var html = `<div class="d-flex flex-wrap gap-1">`;
    opcoes.forEach((op) => {
        // Oculta o botão do status atual (já está nele)
        if(op.valor != statusAtual){
            // Passa filtro atual para manter o filtro após a ação
            html += `<a href='admin.html?id=${index}&acao=status&novoStatus=${op.valor}&filtro=${filtroAtual}'
                        class="btn btn-outline-${op.cor} btn-status">
                        ${op.label}
                     </a>`;
        }
    });
    html += `</div>`;
    return html;
}

function executaAcao(acao, indice, url, filtroAtual){
    // PRIMEIRO PASSO
    var animais = JSON.parse(localStorage.getItem("animais"));

    if(acao == 'status'){
        var parametros = new URLSearchParams(window.location.search);
        var novoStatus = parametros.get("novoStatus");
        var filtro = filtroAtual != null ? filtroAtual : "todos";

        animais[indice].status = novoStatus;

        // ULTIMO PASSO
        localStorage.setItem("animais", JSON.stringify(animais));
        window.location.href = url + "?filtro=" + filtro; // RECARREGA A TELA mantendo filtro

    }else{
        console.log("Algo deu muito errado");
    }
}

function filtrar(status){
    var url = window.location.origin + window.location.pathname;
    window.location.href = url + "?filtro=" + status;
}

function destacaBotaoFiltro(filtro){
    // Nenhuma marcação especial necessária — a URL já indica o filtro ativo
}

function badgeStatus(status){
    var labels = {
        aguardando:     "Aguardando",
        em_atendimento: "Em Atendimento",
        pronto:         "Pronto para retirada",
        entregue:       "Entregue"
    };
    var label = labels[status] != undefined ? labels[status] : status;
    return `<span class="badge-status status-${status}">${label}</span>`;
}

function sair(){
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}
