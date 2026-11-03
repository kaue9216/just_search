<?php
$servidor = "localhost";
$usuario = "admin";
$senha = "12345";
$nome_banco = "projeto";

mysqli_report(MYSQLI_REPORT_OFF);
$conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);
if($conexao->connect_error){
    header("Content-type:application/json;charset=utf-8");
    echo json_encode([
        'status' => 'nok',
        'mensagem' => 'Erro ao conectar no banco: ' . $conexao->connect_error,
        'data' => []
    ]);
    exit;
}
$conexao->set_charset("utf8mb4");
