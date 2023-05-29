//NOTE THIS MODULE WILL BE REMOVED AND BUTTONS WILL BE TRANSFERED TO html_manager.js
MODULENAME = "script.js";

console.log('%c' + MODULENAME + ': ', 'color:blue;' );




/*****************************************************/
//FUNCTION - Buttons for various pages like admin, game and login
/*****************************************************/

// PAGE DISPLAY SETTINGS
/*****************************************************/
//LOGIN PAGE
/*****************************************************/
// function LoginBtnClick() {


// }
/*****************************************************/
//LANDING PAGE
/*****************************************************/
//click to go into game function
function enterBtnClick() {
    console.log("b_goBackLandingBtn");

  //window.location.href = "gp_gamePage.html";
  window.location.href = "lb_lobbyPage.html";
}
/*****************************************************/
//GAME PAGE 
/*****************************************************/
//back to landing page button
function goBackLandingBtn() {
  console.log("b_goBackLandingBtn");
  window.location.href="lp_landingPage.html";
}


// INSTRUCTIONS FUNCTION
function instructionBtnClick() {
  document.getElementById("b_instructions").innerHTML = "INSTRUCTIONS: \p Guess The Number: Try to guess Player 2's number. Player 2 will also have to guess your number. ";
};



/*****************************************************/
//   END OF CODE
/*****************************************************/