/* 
      Project : Rock, Paper, Scissors game.
      Developper : AB_Dev 
      File : script.js --- All the functions that runs the game.
      Last update : 12/10/2018 


      Summary:
      ========
      1/ Global variables.
      2/ Starting, Stopping and Restarting the app.
      3/ Computer play.
      4/ Player play.
      5/ One-round play.
      6/ Display the player-computer's selection and the game final result.
      7/ Game function (5-round play).
      8/ Display infos.
      ========
*/

/*    
      1/ Global variables: 
      ====================
*/
let playerScore = 0;
let computerScore = 0;
let round = 1;
let paraPlayer = document.createElement("p");
let paraComputer = document.createElement("p");

/*    
      2/ Starting, Stopping and Restarting the app:
      =============================================
*/
function start() {
      const btns = document.querySelectorAll(".btn");
      console.log(btns.length);
      btns.forEach(btn => {
            btn.addEventListener('click', game);
      });
      return btns;
}

function stop() {
      start().forEach(btn => {
            btn.removeEventListener('click', game);
      });
      displayFinalResult().style.display = "";
      playAgain();
      round = 1;
      playerScore = 0;
      computerScore = 0;
}

function playAgain() {
      let playAgainBtn = document.querySelector("#pa-btn");
      let playAgainText = document.querySelector("#pa-txt");
      if (playAgainText === null) {
            playAgainText = document.createElement("p");
            playAgainText.setAttribute('id', "pa-txt");
            playAgainText.textContent = "Play again";
      }
      if (playAgainBtn === null) {
            playAgainBtn = document.createElement("div");
            playAgainBtn.setAttribute('id', "pa-btn");
            playAgainBtn.classList.add("btn");
            playAgainBtn.appendChild(playAgainText);
            document.querySelector("body").appendChild(playAgainBtn);
      } else playAgainBtn.style.display = "";

      playAgainBtn.addEventListener("click", () => {
            start();
            displayFinalResult().style.display = "none";
            playAgainBtn.style.display = "none";
            paraPlayer.textContent = "";
            paraComputer.textContent = "";
            displayRound().textContent = "";
            displayRoundScore().textContent = "";
      });
}

/*    
      3/ Computer play:
      =================
*/
function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computerPlay() {
      let choice = getRandomIntInclusive(0, 2);
      switch (choice) {
            case 0:
                  return "rock";
            case 1:
                  return "paper";
            case 2:
                  return "scissors";
            default:
                  console.error("There is an error!");
                  break;
      }
}

/*    
      4/ Player play:
      ===============
*/
function playerPlay(e) {
      console.log(e.target);
      const btnId = e.target.getAttribute('id');
      switch (btnId) {
            case "btn-1":
                  return "rock";
            case "btn-2":
                  return "paper";
            case "btn-3":
                  return "scissors";
            default:
                  console.error("Not reaching targeted button's id");
                  break;
      }
}

/*    
      5/ One-round play:
      ==================
*/
function oneRoundPlay(playerSelection, computerSelection) {
      if (playerSelection === "paper") {
            switch (computerSelection) {
                  case "rock":
                        playerScore++;
                        return "You win! Paper beats Rock ";
                  case "scissors":
                        computerScore++;
                        return "You lose! Scissors beats Paper";
                  case "paper":
                        return "it's tied!";
            }
      } else if (playerSelection === "rock") {
            switch (computerSelection) {
                  case "paper":
                        computerScore++;
                        return "You lose! Paper beats Rock ";
                  case "scissors":
                        playerScore++;
                        return "You win! Rock beats Scissors";
                  case "rock":
                        return "it's tied!";
            }
      } else if (playerSelection === "scissors") {
            switch (computerSelection) {
                  case "paper":
                        playerScore++;
                        return "You win! Scissors beats Paper ";
                  case "rock":
                        computerScore++;
                        return "You lose! Rock beats Scissors";
                  case "scissors":
                        return "it's tied!";
            }
      } else console.error("There is an error!");
}

/*
      6/ Display the player-computer's selection and the game final result:
      ====================================================================
*/
function displayRound() {
      let paraRound = document.querySelector(".displayRound");
      paraRound.textContent = "round : " + round;

      return paraRound;
}

function displaySelection(playerSelection, computerSelection) {
      let displaySelection = document.querySelector(".displaySelection");

      paraPlayer.textContent = "Player: " + playerSelection;
      paraComputer.textContent = "Computer: " + computerSelection;

      displaySelection.appendChild(paraPlayer);
      displaySelection.appendChild(paraComputer);
}

function displayRoundScore() {
      let paraScore = document.querySelector(".displayScore");
      paraScore.textContent = "score :  Player = " + playerScore +
            " Computer = " + computerScore;

      return paraScore;
}

function displayFinalResult() {
      let displayFinalResult = document.querySelector(".displayFinalResult");
      let para = document.querySelector("#resultText");
      if (para === null) {
            para = document.createElement("p");
            para.setAttribute('id', 'resultText');
      }
      para.textContent = gameFinalResult();
      displayFinalResult.appendChild(para);

      return displayFinalResult;
}

/* 
      7/ Game function (5-round play): 
      ================================
*/
function gameFinalResult() {
      if (playerScore > computerScore) {
            return "You are the winner!!";
      } else if (playerScore < computerScore) {
            return "You lost !!";
      } else return "You are equal !!";
}

function game(e) {
      let pSelection = playerPlay(e);
      let cSelection = computerPlay();

      displayRound();
      displaySelection(pSelection, cSelection);
      console.log(oneRoundPlay(pSelection, cSelection));
      displayRoundScore();
      round++;

      if (round === 6) {
            stop();
      }
}

/* 
      8/ Display infos:
      =================
*/
function info() {
      let info = document.querySelector(".infoContainer");
      console.log(info);
      info.classList.toggle("hide");
}

start();