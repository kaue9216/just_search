<?php
include_once('conexao.php');

    // Resposta padrão do projeto: status, mensagem e data
    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    // Com ?id=X busca uma série; sem id lista todas
    if(isset($_GET['id'])){
        $stmt = $conexao->prepare("SELECT * FROM series WHERE id = ?");
        $stmt->bind_param("i", $_GET['id']);
    }else{
        $stmt = $conexao->prepare("SELECT * FROM series");
    }

    $stmt->execute();
    $resultado = $stmt->get_result();

    // Guarda cada linha do resultado num array
    $tabela = [];
    if($resultado->num_rows > 0){
        while($linha = $resultado->fetch_assoc()){
            $tabela[] = $linha;
        }

        $retorno = [
            'status'   => 'ok',
            'mensagem' => 'Sucesso, consulta efetuada.',
            'data'     => $tabela
        ];
    }else{
        $retorno = [
            'status'   => 'nok',
            'mensagem' => 'Não há registros',
            'data'     => []
        ];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
?>
