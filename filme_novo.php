<?php
include_once('conexao.php');
include_once('filme_upload.php');

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

$titulo    = $_POST['titulo'] ?? '';
$sinopse   = $_POST['sinopse'] ?? '';
$diretor   = $_POST['diretor'] ?? '';
$genero = $_POST['genero'] ?? '';
$ano       = ($_POST['ano'] ?? '') != '' ? (int)$_POST['ano'] : null;

if($titulo == '' || $sinopse == '' || $diretor == '' || $genero == ''){
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Preencha título, sinopse, diretor e gênero.',
        'data' => []
    ];
}else{
    $capa = salvar_capa($pasta_uploads);

    if($capa === false){
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'Arquivo de capa inválido. Envie uma imagem JPG, PNG, WEBP ou GIF de até 5 MB.',
            'data' => []
        ];
    }else{
        $stmt = $conexao->prepare("INSERT INTO filmes (titulo, sinopse, diretor, genero, ano, capa) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssis", $titulo, $sinopse, $diretor, $genero, $ano, $capa);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status' => 'ok',
                'mensagem' => 'registro inserido com sucesso',
                'data' => []
            ];
        }else{
            apagar_capa($pasta_uploads, $capa);
            $retorno = [
                'status' => 'nok',
                'mensagem' => 'falha ao inserir o registro',
                'data' => []
            ];
        }
        $stmt->close();
    }
}

$conexao->close();

header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
?>
