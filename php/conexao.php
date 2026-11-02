<?php
$servidor = "localhost";
$usuario  = "admin";
$senha    = "12345";
$nome_banco = "projeto";

$conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);
if($conexao->connect_error){
    echo $conexao->connect_error;
}
$conexao->set_charset("utf8mb4");

