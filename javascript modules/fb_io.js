/**************************************************************/
// fb_io.js
// Written by Rasvindar Term 1 and 2 2023
/**************************************************************/
var admin = false;

// userDetails firebase 
var userDetails = {

  uid: "",
  email: "",
  name: "",
  photoURL: "",
  gameName: "",
  age: "",
  phone: "",
  gender: "",
  woke: "",
  postCode: "",
  creditCard: "",
  ethnicity: ""

};

var myPlayerNumSS = parseInt(sessionStorage.getItem('myPlayerNum'), 10);
var fb_userTurn = 1;
/**************************************************************/
// fb_initialise()
// Called by setup   window.location.href = "lp_landingPage.html";
// Initialize firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_initialise() {
  console.log('fb_initialise: ');
  /* PLACE YOUR CONFIG FROM THE FIREBASE CONSOLE BELOW <======== */
  var firebaseConfig = {
    apiKey: "AIzaSyDSrEvcf_GLryx5qYL_MFUrCHzghQekNPE",
    authDomain: "comp-2022-rasvindar-singh.firebaseapp.com",
    databaseURL: "https://comp-2022-rasvindar-singh-default-rtdb.firebaseio.com",
    projectId: "comp-2022-rasvindar-singh",
    storageBucket: "comp-2022-rasvindar-singh.appspot.com",
    messagingSenderId: "295205599121",
    appId: "1:295205599121:web:b42f4b6b9c2418c59e0c30",
    measurementId: "G-N33JK3S396"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);

  database = firebase.database();
}

/**************************************************************/
// fb_login(_dataRec)
// Called by setup
// Login to Firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_login() {
  console.log('fb_login: ');
  firebase.auth().onAuthStateChanged(newLogin);

  function newLogin(user) {
    if (user) {
      // user is signed in, so save Google login details
      userDetails.uid = user.uid;
      userDetails.email = user.email;
      userDetails.name = user.displayName;
      userDetails.photoURL = user.photoURL;
      userDetails.gameName = user.gameName;
      userDetails.age = user.age;
      userDetails.gender = user.gender;
      userDetails.woke = user.woke;
      userDetails.postCode = user.postCode;
      userDetails.creditCard = user.creditCard;
      userDetails.ethnicity = user.ethnicity;
      loginStatus = 'logged in';

      //session storage, taking info from the login of user to take to next page
      sessionStorage.setItem("user.uid", user.uid);
      sessionStorage.setItem("user.email", user.email);
      sessionStorage.setItem("user.name", user.displayName);
      sessionStorage.setItem("user.photoURL", user.photoURL);


      fb_readRec(DETAILS, userDetails.uid, userDetails, fb_processRec);

      document.getElementById("loginStatus").innerHTML = "Login Status: " + loginStatus
      console.log('fb_login: status = ' + loginStatus);
    }
    else {
      // user NOT logged in, so redirect to Google login
      loginStatus = 'logged out';
      console.log('fb_login: status = ' + loginStatus);

      var provider = new firebase.auth.GoogleAuthProvider();
      //firebase.auth().signInWithRedirect(provider); // Another method
      firebase.auth().signInWithPopup(provider).then(function(result) {
        userDetails.uid = result.user.uid;
        userDetails.email = result.user.email;
        userDetails.name = result.user.displayName;
        userDetails.photoURL = result.user.photoURL;
        userDetails.gameName = result.user.gameName;
        userDetails.age = result.user.age;
        userDetails.gender = result.user.gender;
        userDetails.woke = result.user.woke;
        userDetails.postCode = result.user.postCode;
        userDetails.creditCard = result.user.creditCard;
        userDetails.ethnicity = result.user.ethnicity;

        //saving info to session storage
        sessionStorage.setItem("user.uid", result.user.uid);
        sessionStorage.setItem("user.email", result.user.email);
        sessionStorage.setItem("user.name", result.user.displayName);
        sessionStorage.setItem("user.photoURL", result.user.photoURL);


        loginStatus = 'logged in via popup';
        console.log('fb_login: status = ' + loginStatus);
        fb_readRec(DETAILS, userDetails.uid, userDetails, fb_processRec);

        //switches to reg page after login
        // window.location.href = "registrationPage.html";
      })
        // Catch errors
        .catch(function(error) {
          if (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            loginStatus = 'error: ' + error.code;
            console.log('fb_login: error code = ' + errorCode + '    ' + errorMessage);
          }
        });
    }
  }
}

/**************************************************************/
// fb_writeRec(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return: 
/**************************************************************/
function fb_writeRec(_path, _key, _data) {
  console.log('fb_WriteRec: path= ' + _path + '  key= ' + _key +
    '  data= ' + _data.name + '/' + _data.score);
  console.log(_data);

  //                           PATH  /  KEY 
  writeStatus = 'waiting';
  firebase.database().ref(_path + '/' + _key).set(_data);

  
  console.log("fb_writeRec: exit");
}

/**************************************************************/
//UPDATE  fb_lobbyUpdate(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return: 
/**************************************************************/
function fb_lobbyUpdate(_path, _key, _data) {
  console.log('fb_lobbyUpdate: path= ' + _path + '  key= ' + _key +
    '  data= ' + _data.name + '/' + _data.score);
  console.log(_data);

  //                           PATH  /  KEY 
  writeStatus = 'waiting';
  firebase.database().ref(_path + '/' + _key).update(_data,

    function(error) {
      if (error) {
        writeStatus = 'failure';
        console.log(error);
      }
      else {
        writeStatus = "OK";

      }
    });
  console.log("fb_lobbyUpdate: exit")
}

// Update Just Scores func
function fb_scoresUpdate(_path, _key, _data) {
  console.log('fb_scoresUpdate: path= ' + _path + '  key= ' + _key +
    '  data= ' + _data.name + '/' + _data.score);
  console.log(_data);

  //                           PATH  /  KEY 
  writeStatus = 'waiting';
  firebase.database().ref(_path + '/' + _key).update(_data,

    function(error) {
      if (error) {
        writeStatus = 'failure';
        console.log(error);
      }
      else {
        writeStatus = "OK";
        console.log("fb_scoresUpdate is successful");
      }
    });
  console.log("fb_lobbyUpdate: exit")
}



/**************************************************************/
// fb_readAll(_path, _data)
// Read all DB records for the path
// Input:  path to read from and where to save it
// Return:
/**************************************************************/
function fb_readAll(_path, _data, _processAll) {
  console.log('fb_readAll: path= ' + _path);

  readStatus = "waiting";
  firebase.database().ref(_path).once("value", gotRecord, readErr);

  function gotRecord(snapshot) {
    if (snapshot.val() == null) {
      readStatus = "no record";
    }
    else {
      readStatus = "OK";
      let dbData = snapshot.val();
      console.log(dbData);
      let dbKeys = Object.keys(dbData);
      _processAll(_data, snapshot, dbKeys);
    }
  }
  function readErr(error) {
    readStatus = "fail";
    console.log(error);
    _processAll(_data, snapshot, dbKeys);
  }
}

/**************************************************************/
// fb_readOn(_path, _data)
// Read all DB records for the path
// Input:  path to read from and where to save it
// Return:
/**************************************************************/
function fb_readOn(_path, _key, _data) {
  console.log('fb_readAll: path= ' + _path);

  readStatus = "waiting";
  firebase.database().ref(_path + "/" + _key + "/" + _data).on("value", readOnLog, readOnErr);

  function readOnLog() {
    console.log(_data + " has been changed - Function readOnLog");
  }
  function readOnErr(error) {
    readStatus = "fail";
    console.log(error);
  }
}

/**************************************************************/
// fb_readOn(_path, _data)
// Read all DB records for the path
// Input:  path to read from and where to save it
// Return:
/**************************************************************/
function fb_readOnPlayerSwitch(_path, _key, _data) {
  console.log('fb_readOnPlayerSwitch: path= ' + _path);

  readStatus = "waiting";


  firebase.database().ref(_path + "/" + _key + "/" + _data).on("value", processReadOnPlayerSwitch, readOnPlayerSwitchErr);

  function processReadOnPlayerSwitch() {
    console.log(_data + " has been changed - Function processReadOnPlayerSwitch");
    fb_readPlayerSwitch();

    if (myPlayerNumSS === fb_userTurn) {
      gs_startTime();
      userStatus.innerHTML = "It is your turn. Submit a guess."
      i_inputBox.style.display = "block";
      submit.style.display = "block"
      // gs_onDisconnect();

    } else {

      i_inputBox.style.display = "none";
      submit.style.display = "none";
      userStatus.innerHTML = "Waiting for other player..."
      timer.innerHTML = "";
    }

  }
  function readOnPlayerSwitchErr(error) {
    readStatus = "fail";
    console.log(error);
    //  _processAll(_data, snapshot, dbKeys);
  }
}


//reads turn
function fb_readPlayerSwitch() {
  firebase.database().ref(LOBBYDATA + '/' + sessionStorage.getItem('host.uid') + '/' + "turn").once("value", fb_processReadPlayerSwitch);
  //tells what new turn is
  function fb_processReadPlayerSwitch(snapshot) {
    if (snapshot.val() == null) {
      //once record is deleted send back to landing page
      //turn off ondisconnect
      firebase.database().ref(LOBBYDATA + '/' + sessionStorage.getItem("host.uid") + '/' + "hostLeft").off();
      firebase.database().ref(LOBBYDATA + '/' + sessionStorage.getItem("host.uid") + '/' + "p2PlayerLeft").off();
      //fb_delRec(LOBBYDATA, sessionStorage.getItem("host.uid"));
      firebase.database().ref(LOBBYDATA + '/' + sessionStorage.getItem("host.uid")).remove(); // deleting lobby
      firebase.database().ref(LOBBYDATA + '/' + sessionStorage.getItem("host.uid")).onDisconnect().cancel();
      window.location.href = "lp_landingPage.html";
    } else {
      fb_userTurn = snapshot.val()
      console.log('fb_readPlayerSwitch fb_userTurn =' + fb_userTurn);
    }

  }
}
/**************************************************************/
// fb_readRec(_path, _key, _data)
// Read a specific DB record
// Input:  path & key of record to read and where to save it
// Return:  
/**************************************************************/

function fb_readRec(_path, _key, _data, _processData) {
  console.log('fb_readRec: path= ' + _path + '  key= ' + _key);
  readStatus = "waiting";

  firebase.database().ref(_path + '/' + _key).once("value", gotRecord, readErr);

  function gotRecord(snapshot) {
    let dbData = snapshot.val();
    if (dbData == null) {
      readStatus = "no record";
      console.log('%cfb_redRec:path = ' + _path + '/key = ' + _key + ': readStatus = ' + readStatus, 'color:brown;');
      _processData(dbData, _data);
      // window.location.href = "registrationPage.html";

    }
    else {
      readStatus = "OK";
      fb_readRecAdmin(ADMIN, userDetails.uid, userDetails);

    }
    console.log(_data)

    _processData(dbData, _data);

    // window.location.href = "lp_landingPage.html";

  }
}
function readErr(error) {
  readStatus = "fail";
  console.log(error);
}
//}



//admin
function fb_readRecAdmin(_path, _key, _data) {
  console.log('fb_readRecAdmin: path= ' + _path + '  key= ' + _key);
  console.log("checking admins");

  readStatus = "waiting";
  firebase.database().ref(_path + '/' + _key).once("value", gotRecordAdmin, readErr);

  function gotRecordAdmin(snapshot) {

    if (snapshot.val() == null) {
      readStatus = "no record";
      console.log("user is not an admin");


    } else {
      readStatus = "OK";

      admin = true;
      console.log("You are an admin");
      let b_lpAdmin = document.getElementById("b_lpAdmin");

      if (b_lpAdmin) {
        b_lpAdmin.style.display = "block";
      }



    }

  }
  function readErr(error) {
    readStatus = "fail";
    console.log(error);

  }

}


// see if user is registered before moving it to either index or reg page 

function fb_processRec(_dbData, _data) {
  console.log("processData: ");
  console.log(_dbData)

  if (_dbData == null && admin == false) {
    console.log("admin = " + admin);
    // window.location.href = "index.html";
    window.location.href = "registrationPage.html";

  } else {

    console.log(_data);
    if (_data.email != null) {

      _data.uid = _dbData.uid;
      _data.name = _dbData.name;
      _data.email = _dbData.email;
      _data.phone = _dbData.phone;
      _data.photoURL = _dbData.photoURL;
      _data.gameName = _dbData.gameName;
      _data.age = _dbData.age;
      _data.gender = _dbData.gender;
      _data.woke = _dbData.woke;
      _data.postCode = _dbData.postCode;
      _data.creditCard = _dbData.creditCard;
      _data.ethnicity = _dbData.ethnicity;


      console.log(_data);
      console.log("process username. username: " + _dbData.gameName);
      fb_readRec(BB, userDetails.uid, userScore, fb_processRec);
      fb_readRec("admin", userDetails.uid, userScore, fb_processRec);
      admin = false;
    } else if (admin == false) {

      admin = false;
      sessionStorage.setItem("adminUser", admin);
      _data.score = _dbData.score;
      //  document.getElementById('pPreviousScore').innerHTML = "Highscore: Level " + _dbData.score;
      userDetails.gameName = _dbData.gameName;
      window.location.href = "lp_landingPage.html";
      console.log("process score. score: " + _dbData.score);
    } else {
      console.log("else");
      admin = true;
      window.location.href = "lp_landingPage.html";
      sessionStorage.setItem("adminUser", admin);

    }
  }
  console.log("finished processing data");
}


//the number getting guessed processed
function fb_targetNum(_path, _key, _data) {
  firebase.database().ref(_path + '/' + _key + '/' + _data).once("value", fb_processTargetNum);
  function fb_processTargetNum(snapshot) {
    targetNum = snapshot.val();
  }
}

//deleting fb record function, called when a user wins 
function fb_delRec(_path, _key) {
  console.log("fb_delRec");
  firebase.database().ref(_path + '/' + _key).remove();
  console.log("deleted record");
}

//updating score func, not actually writing it 
function fb_updateScore(_path, _key, _data) {
  firebase.database().ref(_path + '/' + _key + '/' + _data).once("value", fb_processScoreUpdate)

  function fb_processScoreUpdate(snapshot) {
    if (snapshot.val() == null) {
      console.log("score is nothing");

    } else {
      var fetchScore = snapshot.val();
      console.log("this is snapshot val = " + snapshot.val());
      fetchScore = fetchScore + 1;
      Scores = {
        score: fetchScore

      }
      fb_scoresUpdate(SCORES, userDetails.uid, Scores);
    }
  }
}
/**************************************************************/
//    END OF MODULE
/**************************************************************/



