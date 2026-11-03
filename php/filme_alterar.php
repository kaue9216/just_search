<?php
include_once('conexao.php');

$retorno = [
    'status'   => '',
    'mensagem' => '',
    'data'     => []
];

if(isset($_GET['id'])){
    $id      = (int)$_GET['id'];
    $titulo  = trim($_POST['titulo'] ?? '');
    $sinopse = trim($_POST['sinopse'] ?? '');
    $diretor = trim($_POST['diretor'] ?? '');
    $genero  = trim($_POST['genero'] ?? '');
    $ano     = ($_POST['ano'] ?? '') != '' ? (int)$_POST['ano'] : null;

    // Não permite alterar deixando campos vazios (o ano é opcional)
    if($titulo == '' || $sinopse == '' || $diretor == '' || $genero == ''){
        $retorno = [
            'status'   => 'nok',
            'mensagem' => 'Preencha título, sinopse, diretor e gênero.',
            'data'     => []
        ];
    }else{
        $stmt = $conexao->prepare("UPDATE filmes SET titulo = ?, sinopse = ?, diretor = ?, genero = ?, ano = ? WHERE id = ?");
        $stmt->bind_param("ssssii", $titulo, $sinopse, $diretor, $genero, $ano, $id);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Registro alterado com sucesso.',
                'data'     => []
            ];
        }else if($stmt->affected_rows == 0){
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Nenhum dado foi alterado.',
                'data'     => []
            ];
        }else{
            $retorno = [
                'status'   => 'nok',
                'mensagem' => 'Falha ao alterar o registro.',
                'data'     => []
            ];
        }
        $stmt->close();
    }
}else{
    $retorno = [
        'status'   => 'nok',
        'mensagem' => 'Não posso alterar um registro sem um ID informado.',
        'data'     => []
    ];
}

$conexao->close();

header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
?>
