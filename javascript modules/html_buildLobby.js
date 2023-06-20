/*----------------------------------------------------*/
// html_buildLobby.js
// Written by mr Bob, Term 1 2023
// Example of building html lobby
// NOTE: uses a temperate literal
/*----------------------------------------------------*/
const LOBBYDATA = "lobbyData";
MODULENAME = "html_buildLobby.js";
console.log('%c' + MODULENAME + ': ', 'color: blue;');

/*----------------------------------------------------*/
// Example of a template literal
/*----------------------------------------------------*/
var html_simple = `This is a template 
              literal`;
console.log(html_simple);

var firstName = 'John',
  lastName = 'Doe';

var html_greeting = `Hi ${firstName}, ${lastName}`;
console.log(html_greeting); // Hi John, Doe
console.log("-----------------------------------");

var html_sortKey = '';
var lobbyArray = [];
var html_hostUid = "";
var myPlayerNum;
/*----------------------------------------------------*/
// html_getData()
// Called by html GET DATA button
// Call fb_ readAll to read all firebase records in the path
// Input:  n/a
// Output: n/a
/*----------------------------------------------------*/
function html_getData() {
  console.log("html_getData: ");

  fb_readAll(LOBBYDATA, lobbyArray, procLobbies);
}

/*----------------------------------------------------*/
// html_build()
// Called by html build button
// Calls function to build html table
// Input:  n/a
// Output: n/a
/*----------------------------------------------------*/
function html_build() {
  console.log("html_build: ");

  html_buildTableFunc("tb_lobby", lobbyArray);
}

/*----------------------------------------------------*/
// html_reset()
// Called by html reset button
// resets html table & buttons
// Input:  n/a
// Output: n/a
/*----------------------------------------------------*/
function html_reset() {
  console.log("html_reset: ");

  document.getElementById("tb_lobby").innerHTML = '';
  lobbyArray = [];

  var html_elements = document.querySelectorAll('.b_options');
  html_elements.forEach((element) => {
    element.classList.remove('w3-disabled');
  });
  html_elements = document.querySelectorAll('.b_part2');
  html_elements.forEach((element) => {
    element.classList.add('w3-disabled');
  });
}

/*----------------------------------------------------*/
// html_buildTableFunc(_tableBodyID, _array)
// Called by html_build()
// Build html table rows from an array of objects
// Input:  html id of table body, array of objects
//  EG  [{name:   'bobby',
//        wins:    4,
//        draws:   1,
//        losses:  0,
//        UID:     zE45Thkj9#se4ThkP},
//       {name:   'car man',
//        wins:    9,
//        draws:   0,
//        losses:  0,
//        UID:     g7K456hledrj#gkij}]
// Output: n/a
/*----------------------------------------------------*/
function html_buildTableFunc(_tableBodyID, _array) {
  console.log("html_buildTableFunc: ");
  console.table(_array);

  // Get all the info on the table
  var html_table = document.getElementById(_tableBodyID);

  // Loop thu array; build row & add it to table
  for (i = 0; i < _array.length; i++) {
    // Back ticks define a temperate literal
    var row = `<tr>  
                <td>${_array[i].p1gameName}</td>
                <td class="w3-center">${_array[i].p1Wins}</td>
               
                <td class="w3-center">${_array[i].p1Losses}</td>
                <td>${_array[i].p1Uid}</td>
                <td><button class="b_join" onclick = "html_p2Join(), lobbyToGameBtn()">Join</button></td>
              </tr>`
    html_table.innerHTML += row;
  }

  /*--------------------------------------------------*/
  // jQuery ready()
  // Only runs when jQuery determines page is "ready"
  // Adds to all rows inside tb_userDetails an onclick
  //  function to get the current row's UID entry.
  /*--------------------------------------------------*/
  $(document).ready(function() {
    // code to read selected table row cell data (values).
    $("#tb_lobby").on('click', '.b_join', function() {
      // get the current row
      var currentRow = $(this).closest("tr");
      // get current row's 1st TD value
      var col3 = currentRow.find("td:eq(3)").text();
      console.log("html_buildTableFunc: uid = " + col3);
      sessionStorage.setItem("host.uid", col3);

      console.log(sessionStorage.getItem("host.uid"));
      myPlayerNum = 1;
      sessionStorage.setItem('myPlayerNum', myPlayerNum);
      
      html_p2Update();
    });
  });
}

//writing lobby data 
function html_setLobbyData() {
  console.log("setLobbyData runs");
  const LOBBYDATA = "lobbyData";

  sessionStorage.setItem("user.uid", userDetails.uid);
  sessionStorage.setItem("user.name", userDetails.name);
  console.table(lobbyData);
}

// reading lobby data function
function html_getLobbyData() {
  console.log("getLobbyData runs");
  const LOBBYDATA = "lobbyData";
  lobbyData = {
    p1Uid: sessionStorage.getItem("user.uid"),
    p1gameName: sessionStorage.getItem("user.name"),
    p1Wins: 0,
    p1Losses: 0,
    p1RecentGuess: 0,
    join: 0,
    // p2Uid: ,
    // p2gameName: ,
    // p2Wins: 0,
    // p2Losses:0 ,

  }
  console.table(lobbyData);
  fb_writeRec(LOBBYDATA, sessionStorage.getItem("user.uid"), lobbyData);
}


//p2 joins lobby
function html_p2Join() {

  sessionStorage.setItem("p2.uid", userDetails.uid),
    sessionStorage.setItem("p2.gameName", userDetails.name),
    console.log("this is player 2's gameName: " + sessionStorage.getItem("p2.gameName"));
  // sessionStorage.setItem("p2.wins", userDetails.wins),
  // sessionStorage.setItem("p2.losses", userDetails.losses),
  sessionStorage.setItem("join", 1);
}

function html_p2Update() {
  const LOBBYDATA = "lobbyData";
  lobbyData = {

    join: 1,
    p2Uid: sessionStorage.getItem("p2.uid"),
    p2gameName: sessionStorage.getItem("p2.gameName"),
    p2Wins: 0,
    p2Losses: 0,
    p2RecentGuess: 0,
    turn: 0,
    randomNum: sessionStorage.getItem("gs_gameNum")

  }
  
  // fb_lobbyUpdate(LOBBYDATA, sessionStorage.getItem("host.uid"), lobbyData);
  // fb_lobbyUpdate(LOBBYDATA, userDetails.uid, lobbyData);
  html_hostUid = sessionStorage.getItem("host.uid");
  console.log(html_hostUid);
  fb_lobbyUpdate(LOBBYDATA, html_hostUid, lobbyData);

}

//lobby code: for future ref this use to be in test_call.js
function procLobbies(_readStatus, _snapshot, _data, _error) {
  console.log("read status =" + _readStatus);

  if (_readStatus == "fail") {
    console.log("error" + _error);
  } else {
    // if (_readStatus == 'OK')
    let dbData = _snapshot.val();
    let dbKeys = Object.keys(dbData);

    for (i = 0; i < dbKeys.length; i++) {
      let key = dbKeys[i];
      lobbyArray.push({
        lb_join: dbData[key].lb_join,
        p1gameName: dbData[key].p1gameName,
        p1Uid: dbData[key].p1Uid,
        p1Wins: dbData[key].p1Wins,
        p1Losses: dbData[key].p1Losses

      })
    }
    console.log(_data)
    html_buildTableFunc("tb_lobby", lobbyArray);
  } //else {
  //  console.log('lobby lol: proc lobbies');
  //  }
}

//back to landing page button
function goBackLandingBtn() {
  console.log("b_goBackLandingBtn");
  window.location.href = "lp_landingPage.html";
}

function html_getHostUid() {
  sessionStorage.setItem("host.uid", userDetails.uid);

}

//sets host to player 0
function html_setNumForHost(){
  myPlayerNum = 0;
  sessionStorage.setItem('myPlayerNum', myPlayerNum);
}

/*----------------------------------------------------*/
// END OF CODE
/*----------------------------------------------------*/