function validador(bdy){
    
    a = [bdy]
    i = 0
    for (i = 0; i < a.length; i++){
        var obj = a[i]
        for (key in obj){
            if(obj[key] != ""){
                console.log(obj[key])
            }
            
        }
    }

}
