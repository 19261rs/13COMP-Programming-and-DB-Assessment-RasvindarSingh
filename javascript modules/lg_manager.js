
/*----------------------------------------------------*/
//lg_managerV2.js
// Written by Rasvindar Singh, Term 1 & 2 2023
// login functionality/session storage
/*----------------------------------------------------*/

// Version 2 - Key events 
 MODULENAME = "lg_managerV2.js";

console.log('%c' + MODULENAME + ': ', 'color:blue;');


//login function
function login() {
  fb_initialise();
  fb_login(userDetails);
}



//console logging user data and checking if saved to session storage
function sessionData() {
  console.log("SessionTest" + sessionStorage.getItem("user.uid"));
  console.log("SessionTest" + sessionStorage.getItem("user.email"));
  console.log("SessionTest" + sessionStorage.getItem("user.photoURL"));
  console.log("SessionTest" + sessionStorage.getItem("user.name"));
  console.log("SessionTest" + sessionStorage.getItem("user.gameName"));
}

/**************************************************************/
//    END OF MODULE
/**************************************************************/





