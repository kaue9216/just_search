document.addEventListener("DOMContentLoaded", () => {
    verificaClientes();

    document.getElementById("btnLogin").addEventListener("click", () => {
        var email = document.getElementById("loginEmail").value;
        var senha = document.getElementById("loginSenha").value;

        if(email == "" || senha == ""){
            mostrarMsg("msgLogin", "Preencha todos os campos.", "danger");
            return;
        }

        var clientes = JSON.parse(localStorage.getItem("clientes"));
        var encontrado = null;

        clientes.forEach((item) => {
            if(item.email == email && item.senha == senha){
                encontrado = item;
            }
        });

        if(encontrado !== null){
            localStorage.setItem("usuarioLogado", JSON.stringify(encontrado));
            if(encontrado.perfil == "admin"){
                window.location.href = "admin.html";
            } else {
                window.location.href = "petshop.html";
            }
        } else {
            mostrarMsg("msgLogin", "E-mail ou senha incorretos.", "danger");
        }
    });

    document.getElementById("btnCadastrar").addEventListener("click", () => {
        var nome = document.getElementById("cadNome").value;
        var email = document.getElementById("cadEmail").value;
        var telefone = document.getElementById("cadTelefone").value;
        var senha = document.getElementById("cadSenha").value;

        if(nome == "" || email == "" || senha == ""){
            mostrarMsg("msgCadastro", "Preencha nome, e-mail e senha.", "danger");
            return;
        }

        var clientes = JSON.parse(localStorage.getItem("clientes"));

        // Verifica se e-mail já existe
        var jaExiste = false;
        clientes.forEach((item) => {
            if(item.email == email){
                jaExiste = true;
            }
        });

        if(jaExiste){
            mostrarMsg("msgCadastro", "Este e-mail já está cadastrado.", "danger");
            return;
        }

        var obj = { nome: nome, email: email, telefone: telefone, senha: senha, perfil: "cliente" };
        clientes.push(obj);
        localStorage.setItem("clientes", JSON.stringify(clientes));

        mostrarMsg("msgCadastro", "Cadastro realizado! Faça o login.", "success");

        // Limpa campos
        document.getElementById("cadNome").value = "";
        document.getElementById("cadEmail").value = "";
        document.getElementById("cadTelefone").value = "";
        document.getElementById("cadSenha").value = "";
    });
});

function verificaClientes(){
    var lista = localStorage.getItem("clientes");
    if(lista == null){
        // Cria lista com o admin padrão já incluído
        var adminPadrao = { nome: "Administrador", email: "admin@petshop.com", telefone: "", senha: "admin123", perfil: "admin" };
        localStorage.setItem("clientes", JSON.stringify([adminPadrao]));
    }

    // Garante que animais também existe
    var animais = localStorage.getItem("animais");
    if(animais == null){
        localStorage.setItem("animais", JSON.stringify([]));
    }
}

function trocarAba(aba){
    if(aba == "login"){
        document.getElementById("painelLogin").style.display = "block";
        document.getElementById("painelCadastro").style.display = "none";
        document.getElementById("abaLogin").classList.add("active");
        document.getElementById("abaCadastro").classList.remove("active");
    } else {
        document.getElementById("painelLogin").style.display = "none";
        document.getElementById("painelCadastro").style.display = "block";
        document.getElementById("abaLogin").classList.remove("active");
        document.getElementById("abaCadastro").classList.add("active");
    }
}

function mostrarMsg(id, texto, tipo){
    var el = document.getElementById(id);
    el.className = "alert alert-" + tipo;
    el.textContent = texto;
    el.style.display = "block";
}
