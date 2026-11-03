<?php
include_once('conexao.php');

    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    if(isset($_GET['id'])){
        $titulo = $_POST["titulo"];
        $autor = $_POST["autor"];
        $editora = $_POST["editora"];
        $ano = $_POST["ano"];
        $genero = $_POST["genero"];
        $numero_paginas = $_POST["numero_paginas"];

        $stmt = $conexao->prepare("UPDATE livros SET titulo = ?, autor = ?, editora = ?, ano = ?, genero = ?, numero_paginas = ? WHERE id = ?");
        $stmt->bind_param("sssisii", $titulo, $autor, $editora, $ano, $genero, $numero_paginas, $_GET['id']);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Registro de livro alterado com sucesso',
                'data'     => []
            ];
        }else if($stmt->affected_rows == 0){
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Nenhum dado foi alterado',
                'data'     => []
            ];
        }else{
            $retorno = [
                'status'   => 'nok',
                'mensagem' => 'Falha ao alterar o registro',
                'data'     => []
            ];
        }
        $stmt->close();
    }else{
        $retorno = [
            'status'   => 'nok',
            'mensagem' => 'É necessário informar um ID para alterar o livro',
            'data'     => []
        ];
    }

    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
?>