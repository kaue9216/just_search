<?php
include_once('conexao.php');
include_once('filme_upload.php');

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

if(isset($_GET['id'])){
    $id = (int)$_GET['id'];

    // Pega o nome da capa antes de excluir, para apagar o arquivo também
    $busca = $conexao->prepare("SELECT capa FROM filmes WHERE id = ?");
    $busca->bind_param("i", $id);
    $busca->execute();
    $linha = $busca->get_result()->fetch_assoc();
    $busca->close();

    $stmt = $conexao->prepare("DELETE FROM filmes WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        if($linha){
            apagar_capa($pasta_uploads, $linha['capa']);
        }
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Registro excluido',
            'data' => []
        ];
    }else{
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'Registro não excluido',
            'data' => []
        ];
    }
    $stmt->close();
}else{
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'É necessário informar um ID para exclusão',
        'data' => []
    ];
}

$conexao->close();

header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
