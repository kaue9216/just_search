<?php
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    $titulo = $_POST['titulo'];
    $conteudo = $_POST['conteudo'];
    $autor = $_POST['autor'];

    if ($titulo == '' || $conteudo == '' || $autor == '') {
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Preencha todos os campos.',
            'data'      => []
        ];
    } else {
        $stmt = $conexao->prepare("INSERT INTO games(titulo, conteudo, autor) VALUES(?, ?, ?)");
        $stmt->bind_param("sss", $titulo, $conteudo, $autor);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $retorno = [
                'status'    => 'ok',
                'mensagem'  => 'registro inserido com sucesso',
                'data'      => []
            ];
        } else {
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
