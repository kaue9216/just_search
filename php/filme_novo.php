<?php
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    $titulo = $_POST['titulo'];
    $sinopse = $_POST['sinopse'];
    $diretor = $_POST['diretor'];
    $genero = $_POST['genero'];
    $ano = null;
    if($_POST['ano'] != ''){
        $ano = (int) $_POST['ano'];
    }

    if($titulo == '' || $sinopse == '' || $diretor == '' || $genero == ''){
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Preencha todos os campos.',
            'data'      => []
        ];
    }
    else{
        $stmt = $conexao->prepare("INSERT INTO filmes(titulo, sinopse, diretor, genero, ano) VALUES(?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssi", $titulo, $sinopse, $diretor, $genero, $ano);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status'    => 'ok',
                'mensagem'  => 'registro inserido com sucesso',
                'data'      => []
            ];
        }
        else{
            $retorno = [
                'status'    => 'nok',
                'mensagem'  => 'falha ao inserir o registro',
                'data'      => []
            ];
        }
        $stmt->close();
    }

    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
