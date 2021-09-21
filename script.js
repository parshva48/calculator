const components = document.querySelectorAll(".col");
const display = document.querySelector(".display");

let x =  null;
let result = 0;

function handleClick(e) {
    let curr = e.target.innerHTML;

    switch(curr) {

        case 'C' : {
            display.textContent = "";
            x = null;
            result = 0;
            break;
        }
         case "backspace" : {  
            x=x.substring(0,x.length-1);
            display.textContent = x;
            break;
         }
        
         case "=" : {
            result = doMath(x);
            if(result !== null || result != undefined) {
                display.textContent = result;
                x = `${result}`;
            }
            else x = null;
            break;
         }
        
         default: {
             if(x === null) x = curr;
            else x += curr;
            display.textContent = x;
         }   
    }
}

function doMath(x) {

    let values = [];
    let oper = [];
    for(let i = 0; i < x.length; i++) {

        let c = x.charAt(i);
        
        if(c === '(') 
            oper.push(c);
        else if(c === ')') {

            while(oper.length > 0 && oper[oper.length-1] !== '(') {
                if(values.length < 2) {
                    alert("Invalid expression");
                    display.textContent = "";
                    x = null;
                    return;
                }

                let operator = oper.pop();
                let b = values.pop();
                let a = values.pop();
                values.push(doOper(b, a, operator));
            }
            oper.pop();
        }

        else if(c === '+' || c === '-' || c === '*' || c === '/' || c === '%') {
             
            while(oper.length > 0 && hasMorePrecedence(c, oper[oper.length-1])) {
                values.push(doOper(values.pop(), values.pop(), oper.pop()));
            }
            oper.push(c);
        }
        else {
            let num="";
            while(i<x.length && (x.charCodeAt(i) >= 48 && x.charCodeAt(i) <= 57) || x.charAt(i) === '.') {
                num += x.charAt(i);
                i++;
            }
            i--;
            num = Number(num);
            values.push(num);
        }
    }
   
     if(oper.length==0)
     {
         return values[0];
     }

    while(oper.length>0)
    {
         values.push(doOper(values.pop(),values.pop(),oper.pop()));

    }

    return values[0];
   
}
    // console.log(doMath("2+3-4*5/2*5"));

function doOper(b, a, oper) {

    switch(oper) {

        case '+' : return b+a;
        case '-' : return a-b;
        case '*' : return a*b;
        case '/' : return a/b;
        case '%' : return a%b;
    }
}    

function hasMorePrecedence(curr, peeked) {

    curr=GetEncode(curr);
     peeked=GetEncode(peeked);
     if(peeked>curr)
     return true;
     return false;
}
function GetEncode(sym)
{
    if(sym=='+'|| sym=='-')
    return 1;
    if(sym=='(')
    return 0;
    if(sym=='/')
    return 3;
    return 2;
}
function handleNumber(num) {

    if(x === null) {
        x = num;
    }
    else x += num;

    displayContent(num);
}

function displayContent(ele) {
    if(ele == '=') {
        
        display.textContent = "";
    }
    else display.textContent += ele;

}


components.forEach((component) => component.addEventListener("click", handleClick));