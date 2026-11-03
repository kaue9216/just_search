// Lista com pesquisa e barra lateral de autores.
// A pesquisa filtra os registros já carregados, sem nova chamada ao PHP.
let registros = [];

document.addEventListener("DOMContentLoaded", () => {
    buscar();
});

document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "artigos_novo.html";
});

// Pesquisa: clique na lupa ou Enter no campo
document.getElementById("btn_busca").addEventListener("click", () => {
    filtrar(document.getElementById("busca").value);
});

document.getElementById("busca").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        filtrar(document.getElementById("busca").value);
    }
});

// Delegação de eventos: 1 listener na lista cobre todos os botões Excluir,
// mesmo os criados dinamicamente a cada renderização.
document.getElementById("lista").addEventListener("click", (e) => {
    const botao = e.target.closest(".perigo");
    if (!botao) return;
    e.preventDefault();
    excluir(botao.dataset.id);
});

// Delegação também na barra lateral: clicar numa categoria filtra a lista
document.getElementById("generos").addEventListener("click", (e) => {
    const link = e.target.closest("a[data-cat]");
    if (!link) return;
    e.preventDefault();
    const cat = link.dataset.cat;
    document.getElementById("busca").value = cat;
    filtrar(cat);
});

async function buscar() {
    try {
        const retorno = await fetch("../php/artigo_get.php");
        if (!retorno.ok) throw new Error("HTTP " + retorno.status);
        const resposta = await retorno.json();
        if (resposta.status === "ok") {
            registros = resposta.data;
            preencherLista(registros);
            preencherCategorias(registros);
        } else {
            document.getElementById("lista").innerHTML =
                "<p class='vazio'>Nenhum artigo encontrado.</p>";
            document.getElementById("generos").innerHTML = "";
        }
    } catch (erro) {
        document.getElementById("lista").innerHTML =
            "<p class='vazio'>Erro ao buscar os dados. Verifique o Apache/MySQL e se o banco.sql foi importado.</p>";
        console.error(erro);
    }
}

// Filtra a lista carregada pelo texto digitado
function filtrar(termo) {
    const t = termo.trim().toLowerCase();
    const campos = ["titulo", "conteudo", "autor"];
    const achados = registros.filter((r) =>
        campos.some((c) => String(r[c] ?? "").toLowerCase().includes(t))
    );
    preencherLista(achados);
}

async function excluir(id) {
    if (!confirm("Deseja realmente excluir este artigo?")) {
        return;
    }
    try {
        const retorno = await fetch("../php/artigo_excluir.php?id=" + id);
        if (!retorno.ok) throw new Error("HTTP " + retorno.status);
        const resposta = await retorno.json();
        alert(resposta.mensagem);
        if (resposta.status === "ok") {
            window.location.reload();
        }
    } catch (erro) {
        alert("ERRO: " + erro.message);
    }
}

// Evita que textos do banco quebrem o HTML (proteção contra XSS)
function escapar(texto) {
    if (texto === null || texto === undefined) return "";
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function preencherLista(tabela) {
    if (tabela.length === 0) {
        document.getElementById("lista").innerHTML =
            "<p class='vazio'>Nenhum artigo encontrado.</p>";
        return;
    }

    // 1) começo da lista  2) um <li> por registro  3) fim da lista
    let html = `<ul class="resultados">`;

    tabela.forEach((r) => {
        const extra = "";
        const meta = escapar(r.autor);
        const descricao = `<p>${escapar(r.conteudo)}</p>`;
        html += `
            <li class="resultado">
                <div class="info">
                    <h3>${escapar(r.titulo)}${extra}</h3>
                    <span class="meta">${meta}</span>
                    ${descricao}
                    <div class="acoes">
                        <a href="artigos_alterar.html?id=${r.id}">Alterar</a>
                        <a href="#" class="perigo" data-id="${r.id}">Excluir</a>
                    </div>
                </div>
            </li>`;
    });

    html += `</ul>`;
    document.getElementById("lista").innerHTML = html;
}

// Barra lateral: lista as categorias cadastradas (mais frequentes primeiro)
function preencherCategorias(tabela) {
    const contagem = {};
    for (const r of tabela) {
        const c = r.autor;
        contagem[c] = (contagem[c] ?? 0) + 1;
    }
    const itens = Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]);

    let html = "";
    itens.forEach((i) => {
        html += `<li><a href="#" data-cat="${escapar(i)}">${escapar(i)}</a></li>`;
    });
    document.getElementById("generos").innerHTML = html;
}
