<?php
include_once('conexao.php');

    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    // Só altera se o id vier na URL (?id=X)
    if(isset($_GET['id'])){
        $titulo = ($_POST['titulo'] ?? '');
        $autor = ($_POST['autor'] ?? '');
        $categoria = ($_POST['categoria'] ?? '');
        $ano = ($_POST['ano'] ?? '');

        // Não permite salvar com campos vazios
        if(trim($titulo) == '' || trim($autor) == '' || trim($categoria) == '' || trim($ano) == ''){
            header("Content-type:application/json;charset=utf-8");
            echo json_encode([
                'status'   => 'nok',
                'mensagem' => 'Preencha todos os campos.',
                'data'     => []
            ]);
            exit;
        }

        // Ano precisa ser numérico
        if(!is_numeric($ano)){
            header("Content-type:application/json;charset=utf-8");
            echo json_encode([
                'status'   => 'nok',
                'mensagem' => 'O ano deve ser um número.',
                'data'     => []
            ]);
            exit;
        }

        // Ordem dos tipos segue os ?: titulo(s), autor(s), categoria(s), ano(i), id(i)
        $stmt = $conexao->prepare("UPDATE series SET titulo = ?, autor = ?, categoria = ?, ano = ? WHERE id = ?");
        $stmt->bind_param("sssii", $titulo, $autor, $categoria, $ano, $_GET['id']);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Registro de série alterado com sucesso',
                'data'     => []
            ];
        }else if($stmt->affected_rows == 0){
            // 0 linhas afetadas: os dados enviados eram iguais aos que já estavam no banco
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Nenhum dado foi alterado.',
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
            'mensagem' => 'É necessário informar um ID para alterar a série',
            'data'     => []
        ];
    }

    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
?>
