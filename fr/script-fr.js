/* 
      Project : Rock, Paper, Scissors app.
      Developper : BOUHADIDA ANIS 
      File : script-fr.js
      Last update : 18/09/2018 


      Summary:
      ========
      1/ Global variables.
      2/ Starting, Stopping and Restarting the app.
      3/ Computer play.
      4/ Player play.
      5/ One-round play.
      6/ Display the player-computer's selection and the game final result.
      7/ Game function (5-round play).
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
      playAgainText.textContent = "Rejouer";
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
   let choix = getRandomIntInclusive(0, 2);
   switch (choix) {
      case 0:
         return "pierre";
      case 1:
         return "papier";
      case 2:
         return "ciseaux";
      default:
         console.error("Une erreur c'est produite!");
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
         return "pierre";
      case "btn-2":
         return "papier";
      case "btn-3":
         return "ciseaux";
      default:
         console.error("id inconnu!");
         break;
   }
}

/*    
      5/ One-round play:
      ==================
*/
function oneRoundPlay(playerSelection, computerSelection) {
   if (playerSelection === "papier") {
      switch (computerSelection) {
         case "pierre":
            playerScore++;
            return "Tu gagne! papier  bat pierre ";
         case "ciseaux":
            computerScore++;
            return "Tu as perdu! ciseaux  bat papier";
         case "papier":
            return "c'est lié!";
      }
   } else if (playerSelection === "pierre") {
      switch (computerSelection) {
         case "papier":
            computerScore++;
            return "Tu as perdu! papier  bat pierre ";
         case "ciseaux":
            playerScore++;
            return "Tu gagne! pierre  bat ciseaux";
         case "pierre":
            return "c'est lié!";
      }
   } else if (playerSelection === "ciseaux") {
      switch (computerSelection) {
         case "papier":
            playerScore++;
            return "Tu gagne! ciseaux  bat papier ";
         case "pierre":
            computerScore++;
            return "Tu as perdu! pierre  bat ciseaux";
         case "ciseaux":
            return "c'est lié!";
      }
   } else console.error("Une erreur c'est produite!");
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

   paraPlayer.textContent = "Joueur: " + playerSelection;
   paraComputer.textContent = "Ordinateur: " + computerSelection;

   displaySelection.appendChild(paraPlayer);
   displaySelection.appendChild(paraComputer);
}

function displayRoundScore() {
   let paraScore = document.querySelector(".displayScore");
   paraScore.textContent = "score :  Joueur = " + playerScore +
      " Ordinateur = " + computerScore;

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
      return "Tu es le vainqueur!!";
   } else if (playerScore < computerScore) {
      return "Tu as perdu !!";
   } else return "Vous êtes égaux !!";
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

start();