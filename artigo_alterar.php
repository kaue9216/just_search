<?php
include_once('conexao.php');

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

if(isset($_GET['id'])){
    $titulo = $_POST['titulo'] ?? '';
    $conteudo = $_POST['conteudo'] ?? '';
    $autor = $_POST['autor'] ?? '';

    $stmt = $conexao->prepare("UPDATE artigos SET titulo = ?, conteudo = ?, autor = ? WHERE id = ?");
    $stmt->bind_param("sssi", $titulo, $conteudo, $autor, $_GET['id']);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Registro alterado com sucesso.',
            'data' => []
        ];
    }else if($stmt->affected_rows == 0){
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Nenhum dado foi alterado.',
            'data' => []
        ];
    }else{
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'Falha ao alterar o registro.',
            'data' => []
        ];
    }
    $stmt->close();
}else{
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Não posso alterar um registro sem um ID informado.',
        'data' => []
    ];
}

$conexao->close();

header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
?>
