if(cadena.charAt(0)==inicial){
    //alert('maybe pertenece');
    for(var i = 1; i < cadena.length; i++){
        var rowTabla = [];

        for(var j = 0; j < tabla.length; j++){
            if(cadena.charAt(i-1)==tabla[j].charAt(0)){
                rowTabla.push(tabla[j]);
            }
        }

        for(var w = 0; w < rowTabla.length; w++){

            for(var x = 0; x <= rowTabla[w].length; x++){
                alert(rowTabla[w].charAt(x+2));
                if(cadena.charAt(i)==rowTabla[w].charAt(x+2)){
                    w++;
                    //alert('maybe pertece'+w);  
                }
                else if(w+1===rowTabla.length && cadena.charAt(i)!=rowTabla[w].charAt(2+x)){
                    alert('no pertenece'); 
                    return alertConatiner.innerHTML=fail;
                }
            }
            for(var y = 0; y< rowTabla.length; y++){
                if(cadena.charAt(i)==rowTabla[w].charAt(2+y)){
                    w++;
                    alert('maybe pertece'+w);  
                }else if(w+1===rowTabla.length && cadena.charAt(i)!=rowTabla[w].charAt(2+y)){
                    alert('no pertenece'); 
                    return alertConatiner.innerHTML=fail;
                }
            }

        }
        if(cadena.charAt(i)==final[0] && cadena.length == i+1){
            //alert('Si pertenece'); 
            return alertConatiner.innerHTML=success;
        }   
    }
    //alert('NO PERTENECE');
    return alertConatiner.innerHTML=fail;
}else{
    //alert('no pertenece');
    return alertConatiner.innerHTML=fail;
}