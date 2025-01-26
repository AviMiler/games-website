let loginButton = document.getElementById("login");
let signUpButton = document.getElementById("signup");
let nameFeild = document.getElementById("userName");
let passwordFeild = document.getElementById("password");
let massege = document.getElementById("massege");

loginButton.addEventListener("click", function (event) {
  login();
});

signUpButton.addEventListener("click", function (event) {
  signup();
});

nameFeild.addEventListener("input", (event) => {
  document.getElementById("userNameLabel").style.color = "white";
});

passwordFeild.addEventListener("input", (event) => {
  document.getElementById("passwordLabel").style.color = "white";
});
//////////////     log in     //////////////

function login() {
  let lisOfUsers = getUsersList();
  let logName = nameFeild.value;
  let logPassword = passwordFeild.value;

  if (!checkMissing(logName, logPassword)) {
    return;
  }

  if (lisOfUsers === undefined) {
    warning("user dosen't exist please sign up");
    return;
  }

  let userIndex = lisOfUsers.findIndex((item) => {
    return item.name.localeCompare(logName) == 0;
  });

  if (userIndex == -1) {
    warning("user does not exist please sign up");
    return;
  }

  if (lisOfUsers[userIndex].password == logPassword) {
    sessionStorage.setItem(
      "player1",
      JSON.stringify(getUsersData()[userIndex])
    );
    sessionStorage.setItem("player1Index", JSON.stringify(userIndex));
    sessionStorage.setItem(
      "gameInProgress",
      JSON.stringify([0, false, false, false])
    );
    window.location.href = "menu.html";
  } else {
    warning("the password is incorrect");
    return;
  }
}

//////////////     sign up     //////////////

function signup() {
  let usersList = getUsersList();
  let usersData = getUsersData();
  let newName = nameFeild.value;
  let newPassword = passwordFeild.value;

  if (!checkMissing(newName, newPassword)) {
    return;
  }

  let indexToSet = findIndexToSet(newName, usersList);
  let newUser = { name: newName, password: newPassword };
  let userDataUnit = {
    name: newName,
    score: 0,
    numOfEasy: 0,
    numOfMedium: 0,
    numOfHard: 0,
  };
  if (indexToSet !== -2) {
    if (indexToSet === -1) {
      usersList.push(newUser);
      usersData.push(userDataUnit);
    } else {
      usersList.splice(indexToSet, 0, newUser);
      usersData.splice(indexToSet, 0, userDataUnit);
    }
    localStorage.setItem("usersList", JSON.stringify(usersList));
    localStorage.setItem("usersData", JSON.stringify(usersData));
  }
  goodMessage("signup successfuly");
}

function findIndexToSet(newUser, usersList) {
  if (usersList.length === 0) {
    return -1;
  }

  let index = usersList.findIndex((item) => {
    return item.name.localeCompare(newUser) >= 0;
  });

  if (index !== -1) {
    if (usersList[index].name === newUser) {
      warning("user name allredy exist");
      return -2;
    }
  }
  return index;
}

//////////////     functions     //////////////

function getUsersList() {
  if (localStorage.length === 0) {
    return [];
  }
  return JSON.parse(localStorage.getItem("usersList"));
}

function getUsersData() {
  if (localStorage.length === 0) {
    return [];
  }
  return JSON.parse(localStorage.getItem("usersData"));
}

function checkMissing(newName, newPassword) {
  let status = true;
  if (newName.length === 0) {
    document.getElementById("userNameLabel").style.color = "red";
    warning("missing user name");
    status = false;
  }
  if (newPassword.length === 0) {
    document.getElementById("passwordLabel").style.color = "red";
    if (status == false) {
      warning("missing parameters");
    } else warning("missing password");
    status = false;
  }
  return status;
}

function warning(text) {
  massege.style.color = "red";
  massege.textContent = text;
}
function goodMessage(text) {
  massege.style.color = "green";
  massege.textContent = text;
}
