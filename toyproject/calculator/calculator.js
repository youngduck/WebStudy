function del(){
    document.getElementById('display').value='';
    document.getElementById('result').value='';
}

var numbercheck=false;
function add(char){
    if(numbercheck==false){
        if(isNaN(char)){}
        else{
            numbercheck=true;
            document.getElementById('display').value+=char;       
        }
    }
    else{
        document.getElementById('display').value+=char;       
        if(isNaN(char))
            numbercheck=false;
}
}

function print(){
    if(numbercheck)
        document.getElementById('result').value=eval(document.getElementById('display').value);
}