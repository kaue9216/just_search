<?php
    include_once('conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    if(isset($_GET['id']))
    {
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
            $stmt = $conexao->prepare("UPDATE series SET titulo = ?, autor = ?, categoria = ?, ano = ? WHERE id = ?");
            $stmt->bind_param("sssii", $titulo, $autor, $categoria, $ano, $_GET['id']);
            $stmt->execute();

            if($stmt->affected_rows > 0)
            {
                $retorno = [
                    'status'    => 'ok',
                    'mensagem'  => 'Registro alterado com sucesso.',
                    'data'      => []
                ];
            }
            else if($stmt->affected_rows == 0)
            {
                $retorno = [
                    'status'    => 'ok',
                    'mensagem'  => 'Nenhum dado foi alterado.',
                    'data'      => []
                ];
            }
            else
            {
                $retorno = [
                    'status'    => 'nok',
                    'mensagem'  => 'Falha ao alterar o registro.',
                    'data'      => []
                ];
            }
            $stmt->close();
        }
    }
    else
    {
        $retorno = [
            'status'    => 'nok',
            'mensagem'  => 'Não posso alterar um registro sem um ID informado.',
            'data'      => []
        ];
    }

    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
