<?php
include_once('conexao.php');

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

$usuario = $_POST['usuario'] ?? '';
$senha = $_POST['senha'] ?? '';

$stmt = $conexao->prepare("SELECT id, nome, email, usuario, instagram FROM cliente WHERE usuario = ? AND senha = ?");
$stmt->bind_param("ss", $usuario, $senha);

$stmt->execute();
$resultado = $stmt->get_result();

$tabela = [];
if($resultado->num_rows > 0){
    while($linha = $resultado->fetch_assoc()){
        $tabela[] = $linha;
    }

    session_start();
    $_SESSION['usuario'] = $tabela;

    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Sucesso, consulta efetuada.',
        'data' => $tabela
    ];
}else{
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Não há registros',
        'data' => []
    ];
}

$stmt->close();
$conexao->close();

header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
