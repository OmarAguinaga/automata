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
var startButton = '<button type="button" class="btn btn-warning" onclick="showFunctiontable()" id="buttonStart"> Ready <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> </button> ';



document.getElementById("alfabeto").innerHTML = alfabeto;
document.getElementById("estados").innerHTML = estados;



function addAlfabeto() {
    alfabeto.push(document.getElementById("alfaEntrada").value);
    document.getElementById("alfabeto").innerHTML = alfabeto;
    document.getElementById("alfaEntrada").value = "";
    document.getElementById("alfaEntrada").focus();
}

function addEstados() {
    estados.push(document.getElementById("estadosEntrada").value);
    document.getElementById("estados").innerHTML = estados;
    document.getElementById("estadosEntrada").value = "";
    document.getElementById("estadosEntrada").focus();
}

function addEstadoInicial() {
    inicial = document.getElementById("inicialEntrada").value;
    document.getElementById("estadoInicial").innerHTML = inicial;
    document.getElementById("inicialEntrada").value = "";
    document.getElementById("inicialEntrada").disabled=true;
    document.getElementById("boton3").disabled=true;
}

function addEstadoFinal() {
    if(document.getElementById("finalEntrada").value != ''){
        final.push(document.getElementById("finalEntrada").value);
        document.getElementById("estadoFinal").innerHTML = final;
        document.getElementById("finalEntrada").value = "";
        document.getElementById('startButton').innerHTML=startButton;
    }else{
        return;
    }
    
}

function showFunctiontable(){
    
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
    data+='<div class="col-md-12"><br><hr><button  type="button" class="btn btn-warning" onclick="generateGraphic()" id="boton5"> Confirmar Funciones </button></div>';
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

    var graph = 'graph LR\n S((Start))-->'+inicial+'(('+inicial+')) \n';
    var tabPos = 0;
    var from = '';
    var to = '';
    var entry = '';


    for (var i=0; i<limitei; i++){
        for(var j=0; j<limitej; j++){
            var tablanumber=1;
            document.getElementById("caption1").innerHTML = "Inserta la Función de Transicion:";

            if(limitei==alfabeto.length){
                tabla[tabPos]+=document.getElementById("function"+i+j).value;
                from = tabla[tabPos].charAt(0);
                entry = tabla[tabPos].charAt(1);
                to = tabla[tabPos].charAt(2);
                graph+=from+'(('+from+'))--'+entry+'-->'+to+'(('+to+'))\n';
            }else{
                tabla[tabPos]+=document.getElementById("function"+i+j).value;
                from = tabla[tabPos].charAt(0);
                entry = tabla[tabPos].charAt(1);
                to = tabla[tabPos].charAt(2);
                graph+=from+'(('+from+'))--'+entry+'-->'+to+'(('+to+'))\n';
            }
            tabPos++;
        }
    }

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
    var success = '<div class="alert alert-success" role="alert"> <a href="#" class="alert-link">Si pertenece</a> </div>';
    var fail = '<div class="alert alert-danger" role="alert"> <a href="#" class="alert-link">No pertenece</a> </div>';
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