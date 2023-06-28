/*----------------------------------------------------*/
// lp_landingpage.js
// Written by Rasvindar Singh, Term 1 & 2 2023
// Code for landing page HTML.
/*----------------------------------------------------*/

//Global Variable declaration
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
  document.getElementById("b_instructions").innerHTML = "INSTRUCTIONS: Guess The Number: The computer has generated a random number, and it is up to you and one other player to compete head to head and figure out what that number is! When its your turn input what you reckon the number is. You will only have 20 seconds per turn and a limited number of guesses.  ";
};

function lp_toLeaderboardPage() {
  window.location.href = "lb_leaderboardPage.html"
}

/**************************************************************/
//    END OF MODULE
/**************************************************************/
