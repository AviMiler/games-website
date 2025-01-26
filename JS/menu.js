document.getElementById("easy").addEventListener("click", function (event) {
  window.location.href = "games/memory game/index.html";
  sessionStorage.setItem("level", JSON.stringify(12));
});
document.getElementById("medium").addEventListener("click", function (event) {
  window.location.href = "games/memory game/index.html";
  sessionStorage.setItem("level", JSON.stringify(18));
});
document.getElementById("hard").addEventListener("click", function (event) {
  window.location.href = "games/memory game/index.html";
  sessionStorage.setItem("level", JSON.stringify(24));
});
document.getElementById("stat").addEventListener("click", function (event) {
  window.location.href = "stats.html";
});
document.getElementById("logout").addEventListener("click", function (event) {
  sessionStorage.clear();
  window.location.href = "index.html";
});
