document.addEventListener("DOMContentLoaded", () => {
    console.log("Teste");
    verificaLivros();
    carregaRegistrosLivros();

    const parametros = new URLSearchParams(window.location.search);
    const acao = parametros.get("acao");
    const id = parametros.get("id");

    const url = window.location.origin + window.location.pathname;
    console.log(`🔎 [URL PARAMS] Ação: "${acao}" | ID: "${id}" | URL Base: "${url}"`);

    // Só posso realizar as ações com essas duas informações
    if(acao !== null && id !== null){
        executaAcao(acao, id, url);
    }

    function verificaJogos(){ 
    console.log("📦 [STORAGE] Verificando existência da chave 'livros' no localStorage...");
    var livros = localStorage.getItem("livros"); 
    
        if(livros == null){ 
            console.log("ℹ️ [STORAGE] Chave 'livros' não encontrada. Inicializando array vazio.");
            localStorage.setItem("livros", JSON.stringify([])); 
        } else {
            console.log("✅ [STORAGE] Chave 'livros' localizada no localStorage.");
        }
    }

    // Evento para adicionar jogo
    document.getElementById("cadastro").addEventListener("click", () => {
        console.log("🖱️ [EVENTO] Clique no botão 'Cadastrar Livro'.");
        var tituloLivro = document.getElementById("titulo_livro").value;
        var autorLivro = document.getElementById("autor_livro").value;
        var generoLivro = document.getElementById("genero_livro").value;
        var editoraLivro = document.getElementById("editora_livro").value;

        console.log(`📥 [INPUTS CAPTURADOS]:
        - Titúlo: "${tituloLivro}"
        - Autor: "${autorLivro}"
        - Gênero: "${generoLivro}"
        - Editora: "${editoraLivro}"`);


        if(tituloLivro == "" || autorLivro == ""){
            console.warn("❌ [VALIDAÇÃO] Falha: Um ou mais campos estão vazios.");
            document.getElementById("msgForm").textContent = "Por favor, preencha todos os 4 campos do livro.";
            return;
        }

        document.getElementById("msgForm").textContent = "";

        var novoLivro = {
            tituloLivro: tituloLivro,
            autorLivro: autorLivro,
            generoLivro: generoLivro,
            editoraLivro: editoraLivro
        };

        console.log("➕ [NOVO LIVRO] Objeto formatado para salvamento:", novoLivro);

        // passo 1
        var livros = JSON.parse(localStorage.getItem("livros"));
        livros.push(novoLivro); // passo 2
        // passo 3
        localStorage.setItem("livros", JSON.stringify(livros));
        console.log("💾 [STORAGE] Livro salvo com sucesso no localStorage! Recarregando página...");
        window.location.reload();
    });
});

function verificaLivros(){
    var livros = localStorage.getItem("livros");
    if(livros == null){
        localStorage.setItem("livros", JSON.stringify([]));
    }
}

function carregaRegistrosLivros(){
    console.log("🔄 [CARREGAMENTO] Renderizando lista de livros cadastrados...");
    var livros = JSON.parse(localStorage.getItem("livros")) || [];
    console.log(`📊 [STORAGE] Total de livros cadastrados no acervo: ${livros.length}`);

    var containerLista = document.getElementById("listalivros");

    if(livros.length == 0){
        console.log("ℹ️ [RENDER] Nenhum livro encontrado no localStorage.");
        containerLista.innerHTML =
            `<div class="text-center text-muted py-4">
                <i class="fa-solid fa-gamepad fa-2x mb-2"></i>
                <p>Nenhum livro cadastrado ainda.</p>
             </div>`;
        return;
    }

    // Estrutura do cabeçalho da tabela
    var tabelaP1 = `<div class="table-responsive">
                    <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th><i class="fa-solid fa-gamepad me-1"></i> Titúlo</th>
                            <th>Autor</th>
                            <th>Gênero</th>
                            <th>Editora</th>
                        </tr>
                    </thead>
                    <tbody>`;

    var tabelaP2 = `</tbody>
                    </table>
                    </div>`;

    var tabelaMeio = "";
    livros.forEach((item, index) => {
        tabelaMeio += `<tr>
                            <td><strong>${item.tituloLivro}</strong></td>
                            <td>${item.autorLivro}</td>
                            <td><span class="badge bg-secondary">${item.generoLivro}</span></td>
                            <td>${item.editoraLivro}</td>
                            <td>
                                <a href='livros.html?id=${index}&acao=alterar' class="btn btn-outline-primary btn-sm me-1">
                                    <i class="fa-solid fa-pen"></i> Editar
                                </a>
                                <a href='livros.html?id=${index}&acao=excluir' class="btn btn-outline-danger btn-sm">
                                    <i class="fa-solid fa-trash"></i> Excluir
                                </a>
                            </td>
                        </tr>`;
    });

    var tabelaFinal = tabelaP1 + tabelaMeio + tabelaP2;
    containerLista.innerHTML = tabelaFinal;
    console.log("✅ [RENDER] Tabela de livros renderizada com sucesso no container #listalivros.");
}

function executaAcao(acao, indice, url){
    console.log(`⚙️ [EXECUTA AÇÃO] Disparada ação "${acao}" no índice [${indice}]`);
    // PRIMEIRO PASSO
    var livros = JSON.parse(localStorage.getItem("livros"));

    if(!livros || !livros[indice]){
        console.error(`❌ [EXECUTA AÇÃO] Erro: Índice [${indice}] não existe no array de livros.`);
        return;
    }

    if(acao == 'excluir'){
        console.log("🗑️ [EXCLUIR] Removendo livro:", livros[indice]);
        livros.splice(indice, 1);
        alert("Livro excluído com sucesso!");
        console.log("✅ [EXCLUIR] Remoção concluída. Redirecionando para limpar parâmetros da URL...");

        // ULTIMO PASSO
        localStorage.setItem("livros", JSON.stringify(livros));
        window.location.href = url; // RECARREGA A TELA

        

    }else if(acao == 'alterar'){
        console.log("✏️ [ALTERAR] Populando formulário com o livro selecionado:", livros[indice]);
        // Carrega valores nos inputs
        var obj = livros[indice];
        document.getElementById("titulo_livro").value = obj.tituloLivro;
        document.getElementById("autor_livro").value = obj.autorLivro;
        document.getElementById("genero_livro").value = obj.generoLivro || "";
        document.getElementById("editora_livro").value = obj.editoraLivro || "";

        // Insere o botão Salvar na tela
        document.getElementById("cadastro").disabled = true;
        var btnSalvar = document.getElementById("btnSalvar");
        btnSalvar.style.display = "block";
        console.log("✏️ [ALTERAR] Formulário pronto para edição. Aguardando clique em #btnSalvar...");

        // Escuta o botão salvar
        btnSalvar.addEventListener("click", () => {
            livros[indice].tituloLivro = document.getElementById("titulo_livro").value;
            livros[indice].autorLivro = document.getElementById("autor_livro").value;
            livros[indice].generoLivro = document.getElementById("genero_livro").value;
            livros[indice].editoraLivro = document.getElementById("editora_livro").value;
            localStorage.setItem("livros", JSON.stringify(livros));
            console.log("✅ [SALVAR ALTERAÇÕES] Alterações salvas! Redirecionando...");
            alert("Livro atualizado com sucesso!");
            window.location.href = url;
        });

    }else{
        console.log("Algo deu muito errado");
    }
}


function sair(){
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}