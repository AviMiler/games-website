///////////  variebles  ///////////

import { runFireWorks } from "./fireWorks.js";
let listOfCards = [];
let pickedCards = [];
let gameData = {
  pick: 0,
  attempts: 0,
  level: 0,
  time: 0,
  stop: false,
  couplesLeft: 0,
  timerId: 0,
  gameScore: 0,
  gameInProgress: 0,
};
let greetings = ["!!כל הכבוד", "!!איזה זיכרון", "!!מצויין", "!!אלוף"];
let indexes = [];
const gameWindow = document.getElementById("gameWindow");
let player1 = JSON.parse(sessionStorage.getItem("player1"));
const timerWindow = document.getElementById("timer");
const attemptsWindow = document.getElementById("attempts");
const scoreWindow = document.getElementById("scoreWindow");

document.getElementById("stat").addEventListener("click", function (event) {
  window.location.href = "/stats.html";
});
document.getElementById("restart").addEventListener("click", function (event) {
  window.location.href = "index.html";
});
document.getElementById("toMenu").addEventListener("click", function (event) {
  window.location.href = "/menu.html";
});
document.getElementById("exit").addEventListener("click", function (event) {
  setGameInProgress(false);
  window.location.href = "/menu.html";
});

class card {
  constructor(element, value) {
    this.element = element;
    this.value = value;
    this.solved = false;
    this.choosen = false;
    this.text = "?";
  }
}

game(JSON.parse(sessionStorage.getItem("level")));

///////////  methods  ///////////

function game(n) {
  gameData.level = n / 6 - 1;
  if (JSON.parse(sessionStorage.getItem("gameInProgress"))[gameData.level]) {
    listOfCards = JSON.parse(
      sessionStorage.getItem(gameData.level + "listOfCards")
    );
    gameData = JSON.parse(sessionStorage.getItem(gameData.level + "gameData"));
    reCreataCards();
  } else {
    gameData.couplesLeft = n / 2;
    indexes = fillIndexes(n);
    createCards(n);
  }
  putCards();
  printTimer();
  scorePrinter();
  attemptsPrinter();
  timer();
}

function createCards(num) {
  for (let index = 0; index < num; index++) {
    let cardElement = MyCreateElement("card", "div");
    let cardIndex = getRandomPosition();
    let cardObj = new card(cardElement, toEven(cardIndex));
    cardElement.textContent = cardObj.text;
    cardElement.addEventListener("click", function (event) {
      chooseCard(listOfCards[index]);
    });
    listOfCards[index] = cardObj;
  }
}

function reCreataCards() {
  for (let index = 0; index < listOfCards.length; index++) {
    let cardElement = MyCreateElement("card", "div");

    cardElement.textContent = listOfCards[index].text;
    cardElement.addEventListener("click", function (event) {
      chooseCard(listOfCards[index]);
    });
    listOfCards[index].element = cardElement;
    if (listOfCards[index].solved) {
      disappear(listOfCards[index]);
    } else {
      listOfCards[index].choosen = false;
      listOfCards[index].element.textContent = "?";
    }
  }
  pickedCards.length = 0;
}

function putCards() {
  listOfCards.map((card) => {
    gameWindow.appendChild(card.element);
  });
}

function getRandomPosition() {
  let i = getRandomInRange(0, indexes.length - 1);
  let n = indexes[i];
  indexes.splice(i, 1);
  return n;
}

async function chooseCard(cardObj) {
  setGameInProgress(true);
  if (!cardObj.solved && !cardObj.choosen && !gameData.stop) {
    cardObj.choosen = true;
    cardObj.text = cardObj.value;
    cardObj.element.textContent = cardObj.text;
    pickedCards.push(cardObj);
    attemptsCnt();
    if (pickedCards.length === 2) {
      //two cards chosen

      if (pickedCards[0].value === pickedCards[1].value) {
        gameData.stop = true;
        await wait(0.5);
        gameData.stop = false;
        coupleSolved();
        scoreHandler();
        handleEnd();
      } else {
        gameData.stop = true;
        await wait(0.5);
        gameData.stop = false;
        coupleUnSolved();
      }
      pickedCards.length = 0;
    }
  }
  saveProgress();
}

function saveProgress() {
  sessionStorage.setItem(
    gameData.level + "listOfCards",
    JSON.stringify(listOfCards)
  );
  sessionStorage.setItem(gameData.level + "gameData", JSON.stringify(gameData));
}

function setGameInProgress(val) {
  let games = JSON.parse(sessionStorage.getItem("gameInProgress"));
  games[gameData.level] = val;
  sessionStorage.setItem("gameInProgress", JSON.stringify(games));
}

function attemptsCnt() {
  gameData.pick++;
  if (gameData.pick == 2) {
    gameData.pick = 0;
    gameData.attempts++;
  }
  attemptsPrinter();
}

function attemptsPrinter() {
  attemptsWindow.textContent = "attempts:  " + gameData.attempts;
}

function scoreHandler() {
  gameData.gameScore += Math.round(
    (100 / gameData.attempts) * gameData.couplesLeft
  );
  scorePrinter();
}

function scorePrinter() {
  scoreWindow.textContent = "score:  " + gameData.gameScore;
}

function timer() {
  gameData.timerId = setInterval(() => {
    gameData.time++;
    printTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(gameData.timerId);
}

function printTimer() {
  timerWindow.textContent = "time:   " + gameData.time;
}

function coupleSolved() {
  pickedCards.map((card) => {
    card.solved = true;
    disappear(card);
  });
}

function disappear(card) {
  card.element.classList.remove("old-class");
  card.element.classList.add("solvedCard");
}

function coupleUnSolved() {
  pickedCards.map((card) => {
    card.text = "?";
    card.element.textContent = card.text;
    card.choosen = false;
  });
}

function handleEnd() {
  gameData.couplesLeft--;
  if (gameData.couplesLeft === 0) {
    setGameInProgress(false);
    stopTimer();
    saveplayerData();
    const endGameWindow = document.getElementById("endGame");
    const message = document.getElementById("message");
    runFireWorks();

    message.textContent = greetings[getRandomInRange(0, greetings.length - 1)];
    endGameWindow.style.display = "flex";
  }
}

function saveplayerData() {
  let playerData = getUserData();
  console.log(playerData);
  playerData.score += gameData.gameScore;
  switch (gameData.level) {
    case 1:
      playerData.numOfEasy++;
      break;
    case 2:
      playerData.numOfMedium++;
      break;
    case 3:
      playerData.numOfHard++;
      break;
  }
  sessionStorage.setItem("player1", JSON.stringify(playerData));
  let allData = JSON.parse(localStorage.getItem("usersData"));
  allData[JSON.parse(sessionStorage.getItem("player1Index"))] = playerData;
  localStorage.setItem("usersData", JSON.stringify(allData));
}

///////////  services  ///////////

function MyCreateElement(className, tpye) {
  let element = document.createElement(tpye);
  element.className = className;
  return element;
}

function fillIndexes(size) {
  return Array.from({ length: size }, (_, index) => index);
}

function toEven(n) {
  if (n % 2 == 0) {
    return n + 1;
  }
  return n;
}

function wait(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUserData() {
  return JSON.parse(sessionStorage.getItem("player1"));
}
