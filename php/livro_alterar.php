<?php
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    if(isset($_GET['id'])){
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
            $stmt = $conexao->prepare("UPDATE livros SET titulo = ?, autor = ?, editora = ?, ano = ?, genero = ?, numero_paginas = ? WHERE id = ?");
            $stmt->bind_param("sssisii", $titulo, $autor, $editora, $ano, $genero, $numero_paginas, $_GET['id']);
            $stmt->execute();

            if($stmt->affected_rows > 0){
                $retorno = [
                    'status'    => 'ok',
                    'mensagem'  => 'Registro alterado com sucesso.',
                    'data'      => []
                ];
            }
            else if($stmt->affected_rows == 0){
                $retorno = [
                    'status'    => 'ok',
                    'mensagem'  => 'Nenhum dado foi alterado.',
                    'data'      => []
                ];
            }
            else{
                $retorno = [
                    'status'    => 'nok',
                    'mensagem'  => 'Falha ao alterar o registro.',
                    'data'      => []
                ];
            }
            $stmt->close();
        }
    }
    else{
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Não posso alterar um registro sem um ID informado.',
            'data'      => []
        ];
    }

    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
