MODULENAME = "gs_gameCode.js";
console.log('%c' + MODULENAME + ': ', 'color: blue;');

var gs_randomGameNum;

// generating a random rumber and writing to open FB lobby feild 
function gs_randomNumberGen(){
  gs_randomGameNum = Math.floor(Math.random()*3);
  console.log(gs_randomGameNum);
  sessionStorage.setItem("gs_gameNum", gs_randomGameNum);
  html_p2Update();
  
}

//back to landing page button
function gs_goBackLandingBtn() {
  console.log("b_goBackLandingBtn");
  window.location.href="lp_landingPage.html";
}




// // Greeting the user with their personal name on landing page
// document.getElementById('p_lpuserNameGreet').innerHTML = "Welcome, " + sessionStorage.getItem("user.name");


// document.getElementById('i_lpuserPhotoURL').src = sessionStorage.getItem("user.photoURL");
