<?php
include_once('conexao.php');

$retorno = [
    'status'   => '',
    'mensagem' => '',
    'data'     => []
];

$titulo  = trim($_POST['titulo'] ?? '');
$sinopse = trim($_POST['sinopse'] ?? '');
$diretor = trim($_POST['diretor'] ?? '');
$genero  = trim($_POST['genero'] ?? '');
$ano     = ($_POST['ano'] ?? '') != '' ? (int)$_POST['ano'] : null;

// Não permite cadastrar com campos vazios (o ano é opcional)
if($titulo == '' || $sinopse == '' || $diretor == '' || $genero == ''){
    $retorno = [
        'status'   => 'nok',
        'mensagem' => 'Preencha título, sinopse, diretor e gênero.',
        'data'     => []
    ];
}else{
    $stmt = $conexao->prepare("INSERT INTO filmes (titulo, sinopse, diretor, genero, ano) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $titulo, $sinopse, $diretor, $genero, $ano);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status'   => 'ok',
            'mensagem' => 'registro inserido com sucesso',
            'data'     => []
        ];
    }else{
        $retorno = [
            'status'   => 'nok',
            'mensagem' => 'falha ao inserir o registro',
            'data'     => []
        ];
    }
    $stmt->close();
}

$conexao->close();

header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
?>
