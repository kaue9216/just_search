<?php
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    $titulo = $_POST['titulo'];
    $autor = $_POST['autor'];
    $editora = $_POST['editora'];
    $ano = $_POST['ano'];
    $genero = $_POST['genero'];
    $numero_paginas = $_POST['numero_paginas'];

    if($titulo == '' || $autor == '' || $editora == '' || $ano == '' || $genero == '' || $numero_paginas == ''){
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Preencha todos os campos.',
            'data'      => []
        ];
    }
    else if(!is_numeric($ano) || !is_numeric($numero_paginas)){
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'O ano e o número de páginas devem ser números.',
            'data'      => []
        ];
    }
    else{
        $stmt = $conexao->prepare("INSERT INTO livros(titulo, autor, editora, ano, genero, numero_paginas) VALUES(?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssisi", $titulo, $autor, $editora, $ano, $genero, $numero_paginas);
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
