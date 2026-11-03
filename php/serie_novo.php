<?php
include_once('conexao.php');

    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    // Lê os dados enviados pelo FormData (se não vier, fica vazio)
    $titulo = ($_POST['titulo'] ?? '');
    $autor = ($_POST['autor'] ?? '');
    $categoria = ($_POST['categoria'] ?? '');
    $ano = ($_POST['ano'] ?? '');

    // Não permite cadastrar com campos vazios
    if(trim($titulo) == '' || trim($autor) == '' || trim($categoria) == '' || trim($ano) == ''){
        header("Content-type:application/json;charset=utf-8");
        echo json_encode([
            'status'   => 'nok',
            'mensagem' => 'Preencha todos os campos.',
            'data'     => []
        ]);
        exit;
    }

    // Ano precisa ser numérico (senão "abc" seria gravado como 0)
    if(!is_numeric($ano)){
        header("Content-type:application/json;charset=utf-8");
        echo json_encode([
            'status'   => 'nok',
            'mensagem' => 'O ano deve ser um número.',
            'data'     => []
        ]);
        exit;
    }

    // Os ? são preenchidos pelo bind_param: s = texto, i = inteiro
    $stmt = $conexao->prepare("INSERT INTO series (titulo, autor, categoria, ano) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $titulo, $autor, $categoria, $ano);
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
