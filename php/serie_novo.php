<?php
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    $titulo = $_POST['titulo'];
    $autor = $_POST['autor'];
    $categoria = $_POST['categoria'];
    $ano = $_POST['ano'];

    if($titulo == '' || $autor == '' || $categoria == '' || $ano == '')
    {
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Preencha todos os campos.',
            'data'      => []
        ];
    }
    else if(!is_numeric($ano))
    {
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'O ano deve ser um número.',
            'data'      => []
        ];
    }
    else
    {
        $stmt = $conexao->prepare("INSERT INTO series(titulo, autor, categoria, ano) VALUES(?, ?, ?, ?)");
        $stmt->bind_param("sssi", $titulo, $autor, $categoria, $ano);
        $stmt->execute();

        if($stmt->affected_rows > 0)
        {
            $retorno = [
                'status'    => 'ok',
                'mensagem'  => 'registro inserido com sucesso',
                'data'      => []
            ];
        }
        else
        {
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
