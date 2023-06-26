/*----------------------------------------------------*/
// gs_gameCode.js
// Written by Rasvindar Singh, Term 1 & 2 2023
// Code for the guess the number game functionality and page.
/*----------------------------------------------------*/

//Global Variable delcaration 
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

/**************************************************************/
//   gs_randomNumberGen function. 
// generating a random rumber and writing to open FB lobby feild, ranNum between 1 -10 
// runs onLoad to the game page
/**************************************************************/
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
  // gs_onDisconnect(); //new
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

/**************************************************************/
//   gs_startTime function. starting time/resseting
/**************************************************************/
function gs_startTime() {

  timeInterval = setInterval(function() {
    timeLeft = parseInt(timeLeft);
    timeLeft--;
    console.log("time left: " + timeLeft + " seconds");
    document.getElementById("timer").innerHTML = "Time left to make a guess: " + timeLeft + " seconds"

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
      timer.innerHTML = "waiting for other guy";

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
      fb_scoresUpdate(SCORES, userDetails.uid, "score");
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
//getting guess form value from the input box that users input guess in
/**************************************************************/
function gs_getGuessInput(_elementId, _item) {
  return document.getElementById(_elementId).elements.item(_item).value;
}

/**************************************************************/
//   onDisconnect function. Runs when user disconnects
/**************************************************************/
function gs_onDisconnect() {
  var myNum = sessionStorage.getItem('myPlayerNum');
  const HOSTFBKEY = sessionStorage.getItem("host.uid");
  const LOBBYREF =  firebase.database().ref(LOBBYDATA + '/' + HOSTFBKEY);
  
  if (myNum == 0) {
   LOBBYREF.onDisconnect().update(//checking if player 1/host has disconnected
      {
        hostLeft: "true"

      }
    )
  } else if (myNum == 1) { //checking if player 2 has disconnected
  LOBBYREF.onDisconnect().update(
      {
        p2PlayerLeft: "true"
    

      }
    )
  }
  if (myNum == 0) {
    //deleting lobby and kicking out other player
    var p2DiscRef = firebase.database().ref(LOBBYDATA + '/' + HOSTFBKEY + '/' + "p2PlayerLeft");
    p2DiscRef.on("value", snapshot => {
      var discRefData = snapshot.val()
      console.log(discRefData);
      if (discRefData == "true") {
      
        alert("Player 2 has disconnected. You will be kicked.");
        LOBBYREF.remove(); // deleting lobby
        LOBBYREF.onDisconnect().cancel();
      }

    })

  } else if (myNum == 1){
      var p1DiscRef = firebase.database().ref(LOBBYDATA + '/' + HOSTFBKEY + '/' + "hostLeft");
  
    p1DiscRef.on("value", snapshot => {
      var discRefData = snapshot.val()
         console.log(discRefData);
      if (discRefData == "true") {
        alert("Player 1 has disconnected. You will be kicked.");
        LOBBYREF.remove(); // deleting lobby
        LOBBYREF.onDisconnect().cancel();
      } 

    })
  } 

}

/**************************************************************/
//    END OF MODULE
/**************************************************************/
