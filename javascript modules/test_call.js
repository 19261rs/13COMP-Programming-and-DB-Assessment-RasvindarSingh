
//NEED TO DO: RELOCATE EVERYTHING IN THIS MODULE TO THE APPROPRIATE ONE AND GET RID OF TEST_CALL.JS

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
// writeRec() - THIS MAKES IT WRITE 
// Input event; called when user clicks WRITE A RECORD button
// Write a record to firebase
// Input:
// Return:
/**************************************************************/
// function writeScore(_score) {
//   console.log(BB);
//   console.log(userDetails.uid);
//   console.log(userDetails.gameName);
//   console.log("writeScore test" + _score);
//   if(_score > userScore.score) {
//       console.log("new high score: "+_score);
//       console.log("old high score: "+userScore.score);
//       //set player's new high score
//       userScore.score = _score;
//       let details = {
//         uid: userDetails.uid,
//         score: _score,
//         gameName: userDetails.gameName
//       }
//       fb_writeRec(BB, userDetails.uid, details);
//     }
// }




/**************************************************************/
//    END OF PROG
/**************************************************************/





