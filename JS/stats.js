let player1Data = JSON.parse(sessionStorage.getItem("player1"));

console.log(player1Data);

document.getElementById("player1Name").textContent = player1Data.name;
document.getElementById("numOfEasy").textContent += player1Data.numOfEasy;
document.getElementById("numOfMedium").textContent = player1Data.numOfMedium;
document.getElementById("numOfHard").textContent = player1Data.numOfHard;
document.getElementById("totalGames").textContent =
  player1Data.numOfEasy + player1Data.numOfMedium + player1Data.numOfHard;
document.getElementById("totalScore").textContent = player1Data.score;
document.getElementById("exit").addEventListener("click", function (event) {
  window.location.href = "/menu.html";
});
document.getElementById("logout").addEventListener("click", function (event) {
  sessionStorage.clear();
  window.location.href = "index.html";
});
