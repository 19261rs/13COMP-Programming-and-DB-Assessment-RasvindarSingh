
MODULENAME = "lp_landingpage.js";
console.log('%c' + MODULENAME + ': ', 'color:blue;');

// Greeting the user with their personal name on landing page
document.getElementById('p_lpuserNameGreet').innerHTML = "Welcome, " + sessionStorage.getItem("user.name");

// Getting the user photo URL displaying on landing page
document.getElementById('i_lpuserPhotoURL').src = sessionStorage.getItem("user.photoURL");

//click to go into game function
function lp_enterBtnClick() {
  console.log("b_goBackLandingBtn");
//window.location.href = "gp_gamePage.html";
  window.location.href = "lb_lobbyPage.html";
}


// INSTRUCTIONS BUTTON FUNCTION ON CLICK
function lp_instructionBtnClick() {
  console.log("instructionBtnClick")
  document.getElementById("b_instructions").innerHTML = "INSTRUCTIONS: \p Guess The Number: Try to guess Player 2's number. Player 2 will also have to guess your number. ";
};
