//Document Object Model (DOM)

const display=document.getElementById("display");
const numberButtons=document.querySelectorAll("[data-number]");
const operatorButtons=document.querySelectorAll("[data-operator]");
const clearButton=document.querySelector("[data-action='clear']");
const backspaceButton=document.querySelector("[data-action='backspace']");
const equalsButton=document.querySelector("[data-action='equals']");

//Calculator state

let currentInput="0";
let previousInput=null;
let operator=null;

//Utility Functions

function updateDisplay() 
{
    display.value=currentInput;
    if(currentInput==="Error" || currentInput==="Math ERROR") 
    {
        display.classList.add("error");
    }else{
        display.classList.remove("error");
    }
}

function resetCalculator() 
{
    currentInput="0";
    previousInput=null;
    operator=null;
    updateDisplay();
}

//Number Input

function appendNumber(number) 
{
    if(number==="." && currentInput.includes(".")) return;

    if(currentInput==="0" && number!==".") 
    {
        currentInput=number;
    }else{
        currentInput+=number;
    }
    updateDisplay();
}

//Operator Handling

function chooseOperator(op) 
{
    if (currentInput==="") return;

    if(previousInput!==null){
        compute();
    }
    previousInput=currentInput;
    operator=op;
    currentInput="";
}

//Calculation Logic

function compute() 
{
    if(operator===null ||
       previousInput===null ||
       currentInput==="" ||
       currentInput==="Error")
    {
        currentInput="Error";
        previousInput=null;
        operator=null;
        updateDisplay();
        return;
    }

    const prev=parseFloat(previousInput);
    const curr=parseFloat(currentInput);

    if(isNaN(prev)||isNaN(curr)) return;

    let result;

    switch(operator)
    {
        case "add":
            result=prev+curr;
            break;
        case "subtract":
            result=prev-curr;
            break;
        case "multiply":
            result=prev*curr;
            break;
        case "divide":
            if(curr===0){
                currentInput="Math ERROR";
                previousInput=null;
                operator=null;
                updateDisplay();
                return;
            }
            result=(prev/curr).toFixed(10);
            break;
        default:
            return;
    }
    currentInput=result.toString();
    operator=null;
    previousInput=null;
    updateDisplay();
}

//Backspace logic

function backspace() 
{
    if (currentInput.length===1)
    {
        currentInput="0";
    }else{
        currentInput=currentInput.slice(0,-1);
    }
    updateDisplay();
}

//Event Listeners

numberButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        appendNumber(button.dataset.number);
    });
});

operatorButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        chooseOperator(button.dataset.operator);
    });
});

equalsButton.addEventListener("click",compute);
clearButton.addEventListener("click",resetCalculator);
backspaceButton.addEventListener("click",backspace);

//Initialize
updateDisplay();