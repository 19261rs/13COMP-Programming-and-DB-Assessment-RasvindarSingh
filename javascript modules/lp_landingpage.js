
MODULENAME = "lp_landingpage.js";
console.log('%c' + MODULENAME + ': ', 'color:blue;' );

// Greeting the user with their personal name on landing page
document.getElementById('p_lpuserNameGreet').innerHTML = "Welcome, " + sessionStorage.getItem("user.name");

// Getting the user photo URL displaying on landing page
document.getElementById('i_lpuserPhotoURL').src = sessionStorage.getItem("user.photoURL");
