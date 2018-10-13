var readlineSync = require('readline-sync');

var infix=readlineSync.question('Please input your question: ');
while(infix.toLowerCase()!="quit"){
    
    var infix2 = Array();
    var current = "";
    
    for(var x = 0; x < infix.length; x++){
        if(infix.charAt(x) != '+' &&  infix.charAt(x) != '-' && infix.charAt(x) != '*' && infix.charAt(x) != '/' && infix.charAt(x) != '%' && infix.charAt(x) != '^' && infix.charAt(x) != '(' && infix.charAt(x) != ')'&&infix.charAt(x).toUpperCase() != 'P' && infix.charAt(x+1).toUpperCase() != 'O' && infix.charAt(x+2).toUpperCase() != 'W' ){
            current += infix.charAt(x);
        }
            
        if(infix.charAt(x) === '+' ||infix.charAt(x) === '-' ||infix.charAt(x) === '*' ||infix.charAt(x) === '/'||infix.charAt(x) === '%' ||infix.charAt(x) === '^'  ||infix.charAt(x) === '(' ||infix.charAt(x) === ')'){
            if(current != ""){
                infix2.push(current);
            }
            infix2.push(infix.charAt(x));
           
            current = "";
        } 
        if(infix.charAt(x).toUpperCase() === 'P' && infix.charAt(x+1).toUpperCase() === 'O' && infix.charAt(x+2).toUpperCase() === 'W' ){
            if(current != ""){
                infix2.push(current);
            }
            infix2.push('POW');
            current = "";
            x+=2;
        }
    
    }
   
    if(current != ""){
    infix2.push(current);
    }
    console.log(infix2);
    
    var stack = Array(infix.length);
    var top = 0;
    var posfix = Array();
    
    for(var x = 0 ; x < infix2.length ; x++){
        switch(infix2[x]){
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case 'POW':
            if(priority(infix2[x]) > priority(stack[top-1])){
                stack[top] = infix2[x];
                top++;
            }
            else{
                top--;
                posfix.push(stack[top]);
                x--;
                continue;
            }
            break;
    
            case '(':
                stack[top] = '(';
                top++;
            break;
    
            case ')':
            top--;
                while(stack[top] != '('){    
                    posfix.push(stack[top]);
                    top--;
                }
            break;
    
            default:
            posfix.push(infix2[x]);
        }
    }
    
    while(top > 0){
        top--;
        posfix.push(stack[top]);
    }
    console.log(posfix);
    
    
    function priority(v){
        if(v == '+' || v == '-'){
            return 1;
        }
        else if(v == '*' || v =='/'||v=='%'){
            return 2;
        }
        else if(v=='POW'){
            return 3;
        }
        else{
            return 0;
        }
    }
    
    
    var reStack = [];
    String.prototype.isNumeric = function() {
        return !isNaN(Number(this)) && isFinite(this);
    }
    
    for(let j=0; j<posfix.length;j++){
        if(posfix[j].isNumeric()){
            reStack.push(posfix[j])
        }else{
            let a = reStack.pop();
            let b = reStack.pop();
            if(posfix[j] === "+") {
                reStack.push(Number(b) + Number(a));
            } else if(posfix[j] === "-") {
                reStack.push(Number(b) - Number(a));
            } else if(posfix[j] === "*") {
                reStack.push(Number(b) * Number(a));
            } else if(posfix[j] === "/") {
                reStack.push(Number(b) / Number(a));
            } else if(posfix[j] === "POW") {
                reStack.push(Math.pow(Number(b), Number(a)));
            } else if(posfix[j] === "%") {
                reStack.push(Number(b) % Number(a));
            } 
        }
    }
    
    let result=reStack.pop();
    
    if(isNaN(result)){
        console.log("Input is not correct!")
    }else{
        
        console.log(result);
    }
     infix=readlineSync.question('Please input your question: ');
}
 console.log("See you next time!");
 return;
