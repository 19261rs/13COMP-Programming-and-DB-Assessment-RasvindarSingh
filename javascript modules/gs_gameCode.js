MODULENAME = "gs_gameCode.js";
console.log('%c' + MODULENAME + ': ', 'color: blue;');

var gs_randomGameNum;
var playerTurn = 0;
var guessedNumInput;
var targetNum;
const SCORES = "Scores";


// generating a random rumber and writing to open FB lobby feild 
function gs_randomNumberGen() {
  gs_randomGameNum = Math.floor(Math.random() * 3);
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
  playerTurn = 1 - playerTurn;
  lobbyData = {
    turn: playerTurn

  }
  fb_lobbyUpdate(LOBBYDATA, sessionStorage.getItem("host.uid"), lobbyData);

}

// submit button click on guess the num game
function gs_guessNumSubmit() {
  i_inputBox.style.display = 'none';
  guessedNumInput = gs_getGuessInput('form_guess', 0);
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

}


//getting guess form value from the input box 
function gs_getGuessInput(_elementId, _item) {
  return document.getElementById(_elementId).elements.item(_item).value;

}


/**************************************************************/
//    END OF MODULE
/**************************************************************/
