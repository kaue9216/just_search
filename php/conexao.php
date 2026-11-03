<?php
$servidor = "localhost";
$usuario  = "root";
$senha    = "";
$nome_banco = "projeto";

$conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);
if($conexao->connect_error){
    // Responde em JSON para o front conseguir mostrar o erro
    header("Content-type:application/json;charset=utf-8");
    echo json_encode([
        'status'   => 'nok',
        'mensagem' => 'Falha na conexão com o banco: ' . $conexao->connect_error,
        'data'     => []
    ]);
    exit;
}
$conexao->set_charset("utf8mb4");

