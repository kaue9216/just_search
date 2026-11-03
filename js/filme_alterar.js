// Para adicionar um campo novo: HTML (input com id e name) + PHP. O JS não muda.
const form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");
    buscar(id);
});

// Busca o registro e preenche o formulário
async function buscar(id) {
    try {
        const retorno = await fetch("../php/filme_get.php?id=" + id);
        const resposta = await retorno.json();
        if (resposta.status === "ok") {
            const registro = resposta.data[0];
            // cada coluna do banco vai para o campo com o mesmo name
            for (const [coluna, valor] of Object.entries(registro)) {
                if (form.elements[coluna]) {
                    form.elements[coluna].value = valor ?? "";
                }
            }
            document.getElementById("id").value = id;
        } else {
            alert("ERRO: " + resposta.mensagem);
            window.location.href = "index_filmes.html";
        }
    } catch (erro) {
        alert("ERRO: não foi possível falar com o servidor.");
        console.error(erro);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("enviar");
    const id = document.getElementById("id").value;
    const fd = new FormData(form);

    btn.disabled = true;
    try {
        const retorno = await fetch("../php/filme_alterar.php?id=" + id, {
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();
        if (resposta.status === "ok") {
            alert("SUCESSO: " + resposta.mensagem);
            window.location.href = "index_filmes.html";
        } else {
            alert("ERRO: " + resposta.mensagem);
        }
    } catch (erro) {
        alert("ERRO: não foi possível falar com o servidor.");
        console.error(erro);
    } finally {
        btn.disabled = false;
    }
});
