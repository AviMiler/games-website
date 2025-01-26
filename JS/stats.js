let playerData = JSON.parse(sessionStorage.getItem("players"));

console.log(playerData);

document.getElementById("player1Name").textContent = playerData[1].name;
document.getElementById("numOfEasy").textContent += playerData[1].numOfEasy;
document.getElementById("numOfMedium").textContent = playerData[1].numOfMedium;
document.getElementById("numOfHard").textContent = playerData[1].numOfHard;
document.getElementById("totalGames").textContent =
  playerData[1].numOfEasy + playerData[1].numOfMedium + playerData[1].numOfHard;
document.getElementById("totalScore").textContent = playerData[1].score;
document.getElementById("exit").addEventListener("click", function (event) {
  window.location.href = "/menu.html";
});
document.getElementById("logout").addEventListener("click", function (event) {
  sessionStorage.clear();
  window.location.href = "index.html";
});
