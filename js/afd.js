var cadenaContainer = document.getElementById('cadenaContainer')
cadenaContainer.style.display='none';

/*Init Mermaid js*/
SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) {
    return elem.getScreenCTM().inverse().multiply(this.getScreenCTM());
};

mermaidAPI.initialize({
    startOnLoad:false
});

/*Global variables declarations*/
var alfabeto = [];
var estados = [];
var inicial =[];
var inicialnumber = new Object();
var final = [];
var tabla = [];
var error = "<code>No acepta elementos vacios o mayores a un caracter</code>";



document.getElementById("alfabeto").innerHTML = alfabeto;
document.getElementById("estados").innerHTML = estados;



function addAlfabeto() {
    if(document.getElementById("alfaEntrada").value == '' || document.getElementById("alfaEntrada").value.length > 1){
        document.getElementById('alfabeto-error').innerHTML = error;
    }else{
        alfabeto.push(document.getElementById("alfaEntrada").value);
        document.getElementById("alfabeto").innerHTML = alfabeto;
        document.getElementById("alfaEntrada").value = "";
        document.getElementById("alfaEntrada").focus();
        document.getElementById('alfabeto-error').innerHTML = '';
    }
}

function addEstados() {
    if(document.getElementById("estadosEntrada").value == '' || document.getElementById("estadosEntrada").value.length > 1){
        document.getElementById('estados-error').innerHTML = error;
    }else{
        estados.push(document.getElementById("estadosEntrada").value);
        document.getElementById("estados").innerHTML = estados;
        document.getElementById("estadosEntrada").value = "";
        document.getElementById("estadosEntrada").focus();
        document.getElementById('estados-error').innerHTML = '';
    }
}

function addEstadoInicial() {
    if(document.getElementById("inicialEntrada").value == '' || document.getElementById("inicialEntrada").value.length > 1){
        document.getElementById('estadoInicial-error').innerHTML = error;
    }else{
        inicial = document.getElementById("inicialEntrada").value;
        document.getElementById("estadoInicial").innerHTML = inicial;
        document.getElementById("inicialEntrada").value = "";
        document.getElementById("inicialEntrada").disabled=true;
        document.getElementById("boton3").disabled=true;
        document.getElementById('estadoInicial-error').innerHTML = '';
    }
}

function addEstadoFinal() {
    if(document.getElementById("finalEntrada").value == '' || document.getElementById("finalEntrada").value.length > 1){
        document.getElementById('estadoFinal-error').innerHTML = error;
    }else{
        final.push(document.getElementById("finalEntrada").value);
        document.getElementById("estadoFinal").innerHTML = final;
        document.getElementById("finalEntrada").value = "";
        document.getElementById("inicialEntrada").disabled=true;
        document.getElementById("boton4").disabled=true;
        document.getElementById('estadoFinal-error').innerHTML = '';
    }

    var limitei;
    var limitej;

    if(estados.length>alfabeto.length){
        limitei = estados.length;
        limitej = alfabeto.length;
    }
    else{
        limitei = alfabeto.length;
        limitej = estados.length;
    }

    var data = '';
    for (var i=0; i<limitei; i++){
        for(var j=0; j<limitej; j++){
        var tablanumber=1;
            document.getElementById("caption1").innerHTML = "Inserta la Funcion de Transicion:";

            if(limitei==alfabeto.length){
                data+='<div class="col-md-4"><p> f(' + estados[j] +","+alfabeto[i]  +') = </p> <input type="text" id="function'+i+j+'"></div>' ;
                tabla.push(estados[j]+alfabeto[i]);
            }else{
                data+='<div class="col-md-4"><p> f(' + estados[i] +","+ alfabeto[j] +') = </p> <input type="text" id="function'+i+j+'"></div>' ;
                tabla.push(estados[i]+alfabeto[j]);
            }

        }
    }
    data+='<div class="col-md-12"><br><hr><button  type="button" class="btn btn-primary" onclick="generateGraphic(); createTable();" id="boton5"> Confirmar Funciones </button></div>';
    document.getElementById("tablas").innerHTML=data;
}


function generateGraphic() {
    var limitei;
    var limitej;

    if(estados.length>alfabeto.length){
        limitei = estados.length;
        limitej = alfabeto.length;
    }
    else{
        limitei = alfabeto.length;
        limitej = estados.length;
    }

    var graph = 'graph LR\n Start((Start))-->'+inicial+'(('+inicial+')) \n';
    var tabPos = 0;
    var from = '';
    var to = '';
    var entry = '';


    for (var i=0; i<limitei; i++){
        for(var j=0; j<limitej; j++){
        var tablanumber=1;
        document.getElementById("caption1").innerHTML = "Inserta la Función de Transicion:";
            tabla[tabPos]+=document.getElementById("function"+i+j).value;
           // if(limitei==alfabeto.length){
                from = tabla[tabPos].charAt(0);
                entry = tabla[tabPos].charAt(1);
                to = tabla[tabPos].charAt(2);
                if(to!=''){
                    graph+=from+'(('+from+'))--'+entry+'-->'+to+'(('+to+'))\n'; 
                }  

            /*}else{
                from = tabla[tabPos].charAt(0);
                entry = tabla[tabPos].charAt(1);
                to = tabla[tabPos].charAt(2);
                graph+=from+'(('+from+'))--'+entry+'-->'+to+'(('+to+'))\n';
            }*/
            tabPos++;
        }
    }
    graph+='style '+final+' stroke-width:6px, stroke:#e74c3c;';
    
    //Grafica
    var div = document.getElementById('graph');
    var insertSvg = function(svgCode, bindFunctions){
        div.innerHTML = svgCode;
    };

    var graphDefinition = graph;
    var graph = mermaidAPI.render('graphDiv', graphDefinition, insertSvg);

    cadenaContainer.style.display='block';

}


function validateIfBelongs(){
    var limitei;
    var limitej;
    var cadena = document.getElementById('cadena').value;
    var success = '<div class="alert alert-success" role="alert"> Si pertenece | <a href="afd.html" class="alert-link">Nuevo AFD</a> </div>';
    var fail = '<div class="alert alert-danger" role="alert"> No pertenece | <a href="afd.html" class="alert-link">Nuevo AFD</a> </div>';
    var alertConatiner = document.getElementById('alert');

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
                if(cadena.charAt(i)==rowTabla[w].charAt(2)){
                    w++;
                    //alert('maybe pertece'+w);  
                }else if(w+1===rowTabla.length && cadena.charAt(i)!=rowTabla[w].charAt(2)){
                    //alert('no pertenece'); 
                    return alertConatiner.innerHTML=fail;
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
}

function createTable(){
    var y = 0;

    //Create a HTML Table element.

    document.getElementById("header").innerHTML = "Tabla de Transicion:";

    var table = document.createElement("table");
    table.className = 'table';


    //Get the count of columns.
    var columnCount = alfabeto.length;

    //Add the header row.
    var row = table.insertRow(-1);
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "";
    row.appendChild(headerCell);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = alfabeto[i];
        row.appendChild(headerCell);
    }
    //Add the rows.
    for (var i = 0; i < estados.length; i++) {
        row = table.insertRow(-1);
        var cell = row.insertCell(-1);
        cell.innerHTML = estados[i];
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = tabla[y].charAt(2);
            y++;
        }
    }
    var dvTable = document.getElementById("tablePrint");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}