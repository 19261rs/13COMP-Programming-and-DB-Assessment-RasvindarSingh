MODULENAME = "gs_gameCode.js";
console.log('%c' + MODULENAME + ': ', 'color: blue;');




// Greeting the user with their personal name on landing page
document.getElementById('p_lpuserNameGreet').innerHTML = "Welcome, " + sessionStorage.getItem("user.name");


// Getting the user photo URL displaying on landing page
document.getElementById('i_lpuserPhotoURL').src = sessionStorage.getItem("user.photoURL");
var gs_randomGameNum;
function gs_randomNumberGen(){
  gs_randomGameNum = Math.floor(Math.random()*3);
  console.log(gs_randomGameNum);
  sessionStorage.setItem("gs_gameNum", gs_randomGameNum);
  html_p2Update();
  
}
