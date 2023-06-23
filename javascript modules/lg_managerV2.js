


// Version 2 - Key events 
MODULENAME = "lg_managerV2.js";

console.log('%c' + MODULENAME + ': ', 'color:blue;' );


//login function
function login() {
 fb_initialise();
  fb_login(userDetails);
}


// MODULENAME = "lg_managerv0.2.js"
var lg_logit = true;
lg_console(MODULENAME + "\n---------------", "blue");
p_debug.textContent = lg_logit;

function lg_console(_text, _color) {
  if (lg_logit == true) {
    console.log("%c" + _text, "color:" + _color);
  }
}


//console logging user data and checking if saved to session storage
function sessionData() {
  console.log("SessionTest" + sessionStorage.getItem("user.uid"));
  console.log("SessionTest" + sessionStorage.getItem("user.email"));
  console.log("SessionTest" + sessionStorage.getItem("user.photoURL"));
  console.log("SessionTest" + sessionStorage.getItem("user.name"));
}






