<?php
include_once('conexao.php');

$retorno = [
    'status' => '',
    'mensagem' => '',
    'data' => []
];

if(isset($_GET['id'])){
    $stmt = $conexao->prepare("SELECT * FROM filmes WHERE id = ?");
    $stmt->bind_param("i", $_GET['id']);
}else if(isset($_GET['busca']) && $_GET['busca'] != ''){
    // Busca pelo campo de pesquisa (titulo, diretor ou genero)
    $busca = "%" . $_GET['busca'] . "%";
    $stmt = $conexao->prepare("SELECT * FROM filmes WHERE titulo LIKE ? OR diretor LIKE ? OR genero LIKE ? ORDER BY titulo");
    $stmt->bind_param("sss", $busca, $busca, $busca);
}else{
    $stmt = $conexao->prepare("SELECT * FROM filmes ORDER BY titulo");
}

$stmt->execute();
$resultado = $stmt->get_result();

$tabela = [];
if($resultado->num_rows > 0){
    while($linha = $resultado->fetch_assoc()){
        $tabela[] = $linha;
    }
    $retorno = [
        'status' => 'ok',
        'mensagem' => 'Sucesso, consulta efetuada.',
        'data' => $tabela
    ];
}else{
    $retorno = [
        'status' => 'nok',
        'mensagem' => 'Não há registros',
        'data' => []
    ];
}

$stmt->close();
$conexao->close();

header("Content-type:application/json;charset=utf-8");
echo json_encode($retorno);
