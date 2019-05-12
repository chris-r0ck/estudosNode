function delCategoria(nome, id){
    if (confirm("Deseja remover esta categoria: " + nome)){
        location.href="/admin/categoria/del/"+id
    }
}