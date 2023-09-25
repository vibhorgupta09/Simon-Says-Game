let btns=["red","green","yellow","blue"];
let levelCount=0;
let gameSeq=[];
let userSeq=[];
let started=false;
let highestScore=0;

let h2=document.querySelector("h2");
h2.innerHTML=`Press any key to start the game<br>Highest score: ${highestScore}`;

document.addEventListener("keypress",function () {
    if (started==false) {
        started=true;
        setTimeout(levelUp,800);
    }
})

function levelUp() {
    userSeq=[];
    levelCount++;
    h2.innerText=`level ${levelCount}`;
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(() => {
        btn.classList.remove("gameFlash");
    }, 250);
}

function btnPress() {
    let btn=this;
    userSeq.push(btn.classList[1]);
    checkAns(userSeq.length-1,btn);    //  == last idx or recently added btn color in userseq
}

function checkAns(idx,btn) {
    if (userSeq[idx]===gameSeq[idx]) {
        userFlash(btn);
        if (idx==gameSeq.length-1) {
            setTimeout(levelUp,700);
        }
    } else {
        wrongFlash();
        reset();
    }
}

function wrongFlash(btn){
    document.bgColor="red";
    setTimeout(() => {
        document.bgColor="white";
    }, 250);
}

function reset() {
    started=false;
    gameSeq=[];
    let score=levelCount-1;
    if (score>highestScore) {
        highestScore=score;
    }
    levelCount=0;
    h2.innerHTML=`GAME OVER! Your score was <b>${score}</b>.<br> Press any key to restart the game.<br>Highest score: ${highestScore}`;
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

let allBtns=document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click",btnPress);
}
