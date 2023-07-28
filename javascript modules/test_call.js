
MODULENAME = "test_call.js";
console.log('%c' + MODULENAME + ': ', 'color:blue;' );


// database access
const DETAILS = "userDetails";      //<=============== INSERT YOUR FIREBASE PATH NAME HERE
var BB = "Scores";

var lobbyData = {};

var loginStatus = ' ';
var readStatus  = ' ';
var writeStatus = ' ';



var userScore = {
  score: ""
}

var dbArray = [];

const LOBBY = "lobbyData";


/**************************************************************/
// readAll()
// Input event; called when user clicks READ ALL button
// Read all firebase records
// Input:
// Return:
/**************************************************************/
function readAll() {
  // CALL YOUR READ ALL FUNCTION        <=================
  fb_readAll(DETAILS, dbArray);
}

/**************************************************************/
// readRec()
// Input event; called when user clicks READ A RECORD button
// Read a specific firebase record
// Input:
// Return:
/**************************************************************/
function readRec() {
  // CALL YOUR READ A RECORD FUNCTION    <=================
  fb_readRec(DETAILS, userDetails.uid, userDetails);

}

/**************************************************************/

/**************************************************************/
//    END OF PROG
/**************************************************************/





