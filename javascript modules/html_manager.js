MODULENAME = "html_manager.js";
console.log('%c' + MODULENAME + ': ', 'color:blue;');

//on load every page other than index - includes fb initialise to write and read and session storage transfer
function html_load() {
  fb_initialise();
  userDetails.uid = sessionStorage.getItem('user.uid')
  userDetails.phone = sessionStorage.getItem('user.phone')
  userDetails.age = sessionStorage.getItem('user.age')
  userDetails.phone = sessionStorage.getItem('user.phone')
  userDetails.email = sessionStorage.getItem('user.email')
  userDetails.photoURL = sessionStorage.getItem('user.photoURL')
  userDetails.name = sessionStorage.getItem('user.name')
  userDetails.gameName = sessionStorage.getItem('user.gameName')
}

//function called on reg page to proceed to landing.
function regToLandingBtn() {
  window.location.href = "lp_landingPage.html";
}

//function called on lobby 'JOIN' button. 
function lobbyToGameBtn() {
  window.location.href = "gp_gamePage.html";
}

//loaded on the landing page. Displays admin button depending on admin status.
function html_admin() {
  sessionStorage.getItem("adminUser");
  console.log("adminUser = " + sessionStorage.getItem("adminUser"));

  if (sessionStorage.getItem("adminUser") == "true") {
    console.log("showing admin button");
    b_lpAdmin.style.display = "block";
  } else {
    console.log("admin button is hidden");
    b_lpAdmin.style.display = "none";

  }
}

//button to go from lobby page to game page
function gp_lobbytoGameHost() {
gs_readOnOne();
  window.location.href = "gp_gamePage.html"
}

/**************************************************************/
//    END OF MODULE
/**************************************************************/
