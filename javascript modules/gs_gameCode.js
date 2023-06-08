MODULENAME = "gs_gameCode.js";
console.log('%c' + MODULENAME + ': ', 'color: blue;');

var gs_randomGameNum;
var playerTurn = 0;

// generating a random rumber and writing to open FB lobby feild 
function gs_randomNumberGen() {
  gs_randomGameNum = Math.floor(Math.random() * 3);
  console.log(gs_randomGameNum);
  sessionStorage.setItem("gs_gameNum", gs_randomGameNum);

}

//back to landing page button
function gs_goBackLandingBtn() {
  console.log("b_goBackLandingBtn");
  window.location.href = "lp_landingPage.html";
}

//function reading players join status 
function gs_readOnOne() {
  console.log("gs_readOnOne running");
  fb_readOn(LOBBYDATA, sessionStorage.getItem("host.uid"), "join");
}


//switching turns function
function gs_switchTurns() {
  playerTurn = 1 - playerTurn;
  lobbyData = {
    turn: playerTurn
  }
  fb_lobbyUpdate(LOBBYDATA, sessionStorage.getItem("host.uid"), lobbyData);
}

//checking which players turn it is
function readOnTurn() {

}





// // Greeting the user with their personal name on landing page
// document.getElementById('p_lpuserNameGreet').innerHTML = "Welcome, " + sessionStorage.getItem("user.name");


// document.getElementById('i_lpuserPhotoURL').src = sessionStorage.getItem("user.photoURL");
