///////////  variebles  ///////////

let listOfCards = [];
let pickedCards = [];
const gameWindow = document.getElementById("gameWindow");
let attempts = -1;
const attemptsWindow = document.getElementById("attempts");
class card {
  constructor(element, value) {
    this.element = element;
    this.value = value;
    this.solved = false;
  }
}

///////////  the game  ///////////

createCards(10);
putCards();
attemptsCnt();

///////////  methods  ///////////

function createCards(num) {
  for (let index = 0; index < num; index++) {
    let cardElement = MyCreateElement("card", "div");
    cardObj = new card(cardElement, toEven(index));
    cardElement.textContent = "?";
    cardElement.addEventListener("click", function (event) {
      chooseCard(listOfCards[index]);
    });
    listOfCards.push(cardObj);
  }
}

function putCards() {
  listOfCards.map((card) => {
    gameWindow.appendChild(card.element);
  });
}

function MyCreateElement(className, tpye) {
  element = document.createElement(tpye);
  element.className = className;
  return element;
}

function shuffle() {}

async function chooseCard(cardObj) {
  if (!cardObj.solved) {
    cardObj.element.textContent = cardObj.value;
    pickedCards.push(cardObj);

    if (pickedCards.length === 2) {
      //two cards chosen
      attemptsCnt();
      await wait(2);
      if (pickedCards[0].value === pickedCards[1].value) {
        pickedCards[0].solved = true;
        pickedCards[1].solved = true;
      } else {
        pickedCards[0].element.textContent = "?";
        pickedCards[1].element.textContent = "?";
      }
      pickedCards.length = 0;
    }
  }
}

function attemptsCnt() {
  attempts++;
  attemptsWindow.textContent = "attempts: " + attempts;
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
