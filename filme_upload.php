<?php
// Funções auxiliares para o upload da capa do filme.
// Incluído por filme_novo.php, filme_alterar.php e filme_excluir.php

// Pasta onde as capas ficam salvas (cria se não existir)
$pasta_uploads = __DIR__ . '/../uploads/';

// Salva a imagem enviada no campo "capa".
// Retorna: null se nenhum arquivo foi enviado,
//          o nome do arquivo salvo em caso de sucesso,
//          ou false se o arquivo for inválido.
function salvar_capa($pasta_uploads){
    if(!isset($_FILES['capa']) || $_FILES['capa']['error'] == UPLOAD_ERR_NO_FILE){
        return null;
    }
    if($_FILES['capa']['error'] != UPLOAD_ERR_OK){
        return false;
    }
    // Limite de 5 MB
    if($_FILES['capa']['size'] > 5 * 1024 * 1024){
        return false;
    }

    // Confere o tipo real do arquivo (não confia na extensão enviada)
    $tipos_permitidos = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
        'image/gif'  => 'gif'
    ];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $tipo = finfo_file($finfo, $_FILES['capa']['tmp_name']);
    finfo_close($finfo);

    if(!isset($tipos_permitidos[$tipo])){
        return false;
    }

    if(!is_dir($pasta_uploads)){
        mkdir($pasta_uploads, 0755, true);
    }

    // Nome único para evitar sobrescrever arquivos
    $nome = 'filme_' . bin2hex(random_bytes(8)) . '.' . $tipos_permitidos[$tipo];

    if(move_uploaded_file($_FILES['capa']['tmp_name'], $pasta_uploads . $nome)){
        return $nome;
    }
    return false;
}

// Apaga uma capa antiga da pasta uploads
function apagar_capa($pasta_uploads, $nome){
    if($nome != null && $nome != ''){
        $caminho = $pasta_uploads . basename($nome);
        if(is_file($caminho)){
            unlink($caminho);
        }
    }
}
