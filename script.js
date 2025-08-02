let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");
let turnO = true;
let newGame = document.getElementById("new-btn");
let winCont = document.querySelector(".winner-button");
let result = document.querySelector("#result");

const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,4,6],
    [1,4,7],
    [2,5,8],
    [0,4,8]
]

function resetGame(){
    turnO = true;
    enableButtons();
    winCont.classList.add("hide");
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText = "O";
            turnO=false;
        }
        else {
            box.innerText = "X";
            turnO=true;
        }
        box.disabled = true;
        checkWinner();
    })
})
const checkWinner=()=>{
    for(let pattern of winPattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1===pos2 && pos2===pos3){
                console.log("Winner is", pos1);
                showWinner(pos1);
            }
        }
    }
}
const showWinner = (winner) =>{
    result.innerText = `The winner is ${winner}`;
    winCont.classList.remove("hide");
    const disableBoxes = () =>{
        boxes.forEach(box => box.disabled=true);
    };
    disableBoxes();
}

const enableButtons = () =>{
    boxes.forEach(box=>{
        box.disabled=false;
        box.innerText="";
    });
}

resetBtn.addEventListener("click",resetGame);
newGame.addEventListener("click",resetGame);