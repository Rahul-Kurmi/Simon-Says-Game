let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;  // Reset high score on every refresh
let allScores = [];  // Reset previous scores on every refresh

let h2 = document.querySelector("h2");
let highScoreElement = document.getElementById("high-score");
let scoreList = document.getElementById("score-list");
let levelDisplay = document.getElementById("level-display");

// Display initial high score and previous scores
highScoreElement.innerHTML = highScore;
displayScores();

// Step 1: Key press to start the game
document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game is Started");
    started = true;
    levelUP();
  }
});

// Step 2: Flash and level up
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function UserFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUP() {
  userSeq = [];
  level++;
  levelDisplay.innerText = level;
  h2.innerText = `Level ${level}`;

  // Random button selection
  let ranIdx = Math.floor(Math.random() * 4);
  let ranColor = btns[ranIdx];
  let ranBtn = document.querySelector(`.${ranColor}`);
  gameSeq.push(ranColor);
  console.log("Game Sequence color is ", gameSeq);
  gameFlash(ranBtn);
}

// Check answer
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    console.log("Same Color in Both Sequence");

    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUP, 1000);
    }
  } else {
    // Track all scores
    allScores.push(level);
    displayScores();

    // Update high score if current level is greater
    if (level > highScore) {
      highScore = level;
      highScoreElement.innerHTML = highScore;
    }

    h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";

    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);

    reset();
  }
}

// Add button event listener
function btnPress() {
  console.log("Button pressed is", this);
  let btn = this;
  UserFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log("User Pressed Color is ", userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  levelDisplay.innerText = 1;
}

function displayScores() {
  scoreList.innerHTML = "";
  allScores.forEach((score, index) => {
    let li = document.createElement("li");
    li.innerText = `Game ${index + 1}: ${score}`;
    scoreList.appendChild(li);
  });
}
