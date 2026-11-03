// O formulário (<form id="form">) tem um name em cada campo.
// Para adicionar um campo novo: HTML (input com id e name) + PHP. O JS não muda.
const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // não deixa o navegador recarregar a página
    const btn = document.getElementById("enviar");
    const fd = new FormData(form); // pega todos os campos que têm name

    btn.disabled = true;
    try {
        const retorno = await fetch("../php/artigo_novo.php", {
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();
        if (resposta.status === "ok") {
            alert("SUCESSO: " + resposta.mensagem);
            window.location.href = "index.html";
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
