let loginButton = document.getElementById("login");
let signUpButton = document.getElementById("signup");
let nameFeild = document.getElementById("userName");
let passwordFeild = document.getElementById("password");

loginButton.addEventListener("click", function (event) {
  login();
});

signUpButton.addEventListener("click", function (event) {
  signup();
});

//////////////     log in     //////////////

function login() {
  let lisOfUsers = getUsersList();
  let logName = nameFeild.value;
  let logPassword = passwordFeild.value;

  if (logName.length === 0 || logPassword.length === 0) {
    alert("missing parameters");
    return;
  }

  if (lisOfUsers === undefined) {
    alert("user dosen't exist please sign up");
    return;
  }

  let userIndex = lisOfUsers.findIndex((item) => {
    return item.name.localeCompare(logName) == 0;
  });

  if (userIndex == -1) {
    alert("user does not exist please sign up");
    return;
  }

  if (lisOfUsers[userIndex].password == logPassword) {
    sessionStorage.setItem(
      "player1",
      JSON.stringify(getUsersData()[userIndex])
    );
    sessionStorage.setItem(
      "gameInProgress",
      JSON.stringify([0, false, false, false])
    );
    window.location.href = "menu.html";
  } else {
    alert("the password is incorrect");
    return;
  }
}

//////////////     sign up     //////////////

function signup() {
  let usersList = getUsersList();
  let usersData = getUsersData();
  let newName = nameFeild.value;
  let newPassword = passwordFeild.value;

  if (newName.length === 0 || newPassword.length === 0) {
    alert("missing parameters");
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
      alert("user name allredy exist");
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
