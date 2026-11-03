<?php
include_once('conexao.php');

    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    // Só exclui se o id vier na URL (?id=X)
    if(isset($_GET['id'])){
        $stmt = $conexao->prepare("DELETE FROM series WHERE id = ?");
        $stmt->bind_param("i", $_GET['id']);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Registro de série excluído com sucesso',
                'data'     => []
            ];
        }else{
            $retorno = [
                'status'   => 'nok',
                'mensagem' => 'Falha ao excluir o registro',
                'data'     => []
            ];
        }
        $stmt->close();
    }else{
        $retorno = [
            'status'   => 'nok',
            'mensagem' => 'É necessário informar um ID para excluir a série',
            'data'     => []
        ];
    }

    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
?>
