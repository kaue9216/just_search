<?php
    $servidor = "localhost:8889";
    $usuario  = "root";
    $senha    = "root"; // `root` padrão MAMP (MacOS) ou vazio padrão XAMPP (Windows)
    $nome_banco = "just_search";

    $conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);
    if($conexao->connect_error){
        echo $conexao->connect_error;
    }