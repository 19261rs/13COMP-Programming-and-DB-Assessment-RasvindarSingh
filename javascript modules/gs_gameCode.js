MODULENAME = "gs_gameCode.js";
console.log('%c' + MODULENAME + ': ', 'color: blue;');

var gs_randomGameNum;
var playerTurn = 0;
var guessedNumInput;
var targetNum;
const SCORES = "Scores";
var timeInterval;
var timeLeft = 20;
var readPlayerSwitch = true;


// generating a random rumber and writing to open FB lobby feild, ranNum between 1 -10 
function gs_randomNumberGen() {
  gs_randomGameNum = Math.floor(Math.random() * 10) + 1;
  console.log(gs_randomGameNum);
  sessionStorage.setItem("gs_gameNum", gs_randomGameNum);
  lobbyData = {
    ranNum: gs_randomGameNum
  }
  fb_lobbyUpdate(LOBBYDATA, sessionStorage.getItem("host.uid"), lobbyData);


}

// calling readOnPlayerSwitch on game screen
function gs_readOnPlayerSwitch() {
  fb_readOnPlayerSwitch(LOBBYDATA, sessionStorage.getItem('host.uid'), "turn");
  console.log('issued fb_readOnPlayerSwitch');
  readPlayerSwitch = false;


}

//back to landing page button
function gs_goBackLandingBtn() {
  console.log("b_goBackLandingBtn");
  window.location.href = "lp_landingPage.html";
}

//function reading players join status 
function gs_readOnOne() {
  console.log("gs_readOnOne running");
  fb_readOn(LOBBYDATA, sessionStorage.getItem("host.uid"), "join");
}


//switching turns function
function gs_switchTurns() {
  clearInterval(timeInterval);
  playerTurn = 1 - playerTurn;

  lobbyData = {
    turn: playerTurn

  };

  fb_lobbyUpdate(LOBBYDATA, sessionStorage.getItem("host.uid"), lobbyData);
  timeLeft = 20;

}


function gs_startTime() {


  timeInterval = setInterval(function() {
    timeLeft = parseInt(timeLeft);
    timeLeft--;
    console.log("time left: " + timeLeft + " seconds");



    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      timeLeft = 20;

      if (fb_userTurn === 0) {
        fb_userTurn = 1;
      } else {

        fb_userTurn = 0;

      }

      lobbyData = {
        turn: fb_userTurn
      };

      fb_lobbyUpdate(LOBBYDATA, sessionStorage.getItem("host.uid"), lobbyData);


    }

    if (timeLeft <= 0) {
      i_inputBox.style.display = "none";
      submit.style.display = "none";
      userStatus.innerHTML = "Waiting for other player...";
    }
  }, 1000);

  // Reset timer countdown

}



/**************************************************************/
//   gs_guessNumSubmit function
/**************************************************************/
// submit button click on guess the num game



function gs_guessNumSubmit() {

  guessedNumInput = gs_getGuessInput('form_guess', 0);

  //validation for input box only 1-10 input
  var parsedNum = parseInt(guessedNumInput);
  if (isNaN(parsedNum) || parsedNum < 1 || parsedNum > 10) {
    alert("Guess number must be a number between 1-10");
  } else if (!/^\d+$/.test(guessedNumInput)) {
    alert("Can only contain digits. No special characters or symbols")
  }

  else {
    var i_inputBox = document.getElementById("i_inputBox");
    i_inputBox.style.display = 'none';

    fb_targetNum(LOBBYDATA, sessionStorage.getItem('host.uid'), "ranNum");

    console.log("guessednuminput: " + guessedNumInput);
    console.log("target num: " + targetNum);

    if (guessedNumInput == targetNum) {

      console.log("You win");
      alert("You Win");
      //updating scores

      //player 1 wins - issue a read instead of 0
      var userScore = 0 + 1;

      Scores = {
        score: userScore
      };
      //updates score and kicks them to landing page
      fb_lobbyUpdate(SCORES, userDetails.uid, Scores);
      //deleting record
      fb_delRec(LOBBYDATA, sessionStorage.getItem("host.uid"));
      //sending user home
      window.location.href = "lp_landingPage.html";


    } else {

      //changing hosts guess and turn feild
      if (fb_userTurn == 0) {

        fb_userTurn = 1;

        lobbyData = {
          turn: fb_userTurn,
          p1RecentGuess: guessedNumInput
        }

        fb_lobbyUpdate(LOBBYDATA, sessionStorage.getItem('host.uid'), lobbyData);

      } else {
        //changing player 2's guess and turn feild
        fb_userTurn = 0;

        lobbyData = {
          turn: fb_userTurn,
          p2RecentGuess: guessedNumInput
        }
        fb_lobbyUpdate(LOBBYDATA, sessionStorage.getItem('host.uid'), lobbyData);



      }


    }
    // Reset timer countdown
    clearInterval(timeInterval);
    timeLeft = 20;


  }
}




/**************************************************************/
//   gs_getGuessInput function
/**************************************************************/
//getting guess form value from the input box 
function gs_getGuessInput(_elementId, _item) {
  return document.getElementById(_elementId).elements.item(_item).value;
}

/**************************************************************/
//   onDisconnect function. Runs when user disconnects
/**************************************************************/
function gs_onDisconnect() {
  //WIP
}


/**************************************************************/
//    END OF MODULE
/**************************************************************/
