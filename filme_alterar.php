<?php
include_once('conexao.php');
include_once('filme_upload.php');

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

if(isset($_GET['id'])){
    $id        = (int)$_GET['id'];
    $titulo    = $_POST['titulo'] ?? '';
    $sinopse   = $_POST['sinopse'] ?? '';
    $diretor   = $_POST['diretor'] ?? '';
    $genero = $_POST['genero'] ?? '';
    $ano       = ($_POST['ano'] ?? '') != '' ? (int)$_POST['ano'] : null;

    $capa = salvar_capa($pasta_uploads);

    if($capa === false){
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'Arquivo de capa inválido. Envie uma imagem JPG, PNG, WEBP ou GIF de até 5 MB.',
            'data' => []
        ];
    }else if($capa === null){
        // Nenhuma capa nova: altera só os dados
        $stmt = $conexao->prepare("UPDATE filmes SET titulo = ?, sinopse = ?, diretor = ?, genero = ?, ano = ? WHERE id = ?");
        $stmt->bind_param("ssssii", $titulo, $sinopse, $diretor, $genero, $ano, $id);
    }else{
        // Capa nova: guarda o nome da antiga para apagar depois
        $busca = $conexao->prepare("SELECT capa FROM filmes WHERE id = ?");
        $busca->bind_param("i", $id);
        $busca->execute();
        $linha = $busca->get_result()->fetch_assoc();
        $capa_antiga = $linha ? $linha['capa'] : null;
        $busca->close();

        $stmt = $conexao->prepare("UPDATE filmes SET titulo = ?, sinopse = ?, diretor = ?, genero = ?, ano = ?, capa = ? WHERE id = ?");
        $stmt->bind_param("ssssisi", $titulo, $sinopse, $diretor, $genero, $ano, $capa, $id);
    }

    if(isset($stmt)){
        $stmt->execute();

        if($stmt->affected_rows > 0){
            if($capa !== null){
                apagar_capa($pasta_uploads, $capa_antiga);
            }
            $retorno = [
                'status' => 'ok',
                'mensagem' => 'Registro alterado com sucesso.',
                'data' => []
            ];
        }else if($stmt->affected_rows == 0){
            $retorno = [
                'status' => 'ok',
                'mensagem' => 'Nenhum dado foi alterado.',
                'data' => []
            ];
        }else{
            $retorno = [
                'status' => 'nok',
                'mensagem' => 'Falha ao alterar o registro.',
                'data' => []
            ];
        }
        $stmt->close();
    }
}else{
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Não posso alterar um registro sem um ID informado.',
        'data' => []
    ];
}

$conexao->close();

header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
?>
