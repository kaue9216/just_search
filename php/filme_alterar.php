<?php
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    if(isset($_GET['id'])){
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
            $stmt = $conexao->prepare("UPDATE filmes SET titulo = ?, sinopse = ?, diretor = ?, genero = ?, ano = ? WHERE id = ?");
            $stmt->bind_param("ssssii", $titulo, $sinopse, $diretor, $genero, $ano, $_GET['id']);
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
