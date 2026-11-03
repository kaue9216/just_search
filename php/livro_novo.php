<?php

    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    $titulo = $_POST["titulo"];
    $autor = $_POST["autor"];
    $editora = $_POST["editora"];
    $ano = $_POST["ano"];
    $genero = $_POST["genero"];
    $numero_paginas = $_POST["numero_paginas"];

    $stmt = $conexao->prepare("INSERT INTO livros (titulo, autor, editora, ano, genero, numero_paginas) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssi", $titulo, $autor, $editora, $ano, $genero, $numero_paginas);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status'   => 'ok',
            'mensagem' => 'Registro inserido com sucesso.',
            'data'     => []
        ];
    }else{
        $retorno = [
            'status'   => 'nok',
            'mensagem' => 'Falha ao inserir o registro.',
            'data'     => []
        ];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
?>