<?php
    include_once('conexao.php');

    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    if(isset($_GET['id'])){
        $stmt = $conexao->prepare("DELETE FROM livros WHERE id = ?");
        $stmt->bind_param("i", $_GET['id']);
        $stmt->execute();
        
        if($stmt->affected_rows > 0){
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Registro de livro excluido com sucesso',
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
            'mensagem' => 'É necessário informar um ID para excluir o livro',
            'data'     => []
        ];
    }
    $conexao->close();
    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
?>