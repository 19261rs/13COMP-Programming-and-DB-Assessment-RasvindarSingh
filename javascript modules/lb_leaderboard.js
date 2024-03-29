
/*----------------------------------------------------*/
// lb_getLeaderboard.js
// Written by Rasvindar Singh, Term 1 & 2 2023. 
// Gets scores from 'Scores' and then resorts them from largest, displaying top 3 scores.
//References: Nehan H helped explain it to me  
/*----------------------------------------------------*/

// leaderbord function --> retrieves score data from fb scores path and sorts out in order from highest to lowest 
function lb_getLeaderboard() {
  const lb_leaderboard = document.getElementById("leaderboard");
  lb_leaderboard.innerHTML = "";

  const lb_headingsRow = document.createElement('tr');
  const lb_placementTitle = document.createElement('th');
  const lb_gameNameTitle = document.createElement('th');
  const lb_winsTitle = document.createElement('th');

  lb_placementTitle.textContent = "Placement"
  lb_gameNameTitle.textContent = "Username";
  lb_winsTitle.textContent = "Wins";

  lb_headingsRow.appendChild(lb_placementTitle);
  lb_headingsRow.appendChild(lb_gameNameTitle);
  lb_headingsRow.appendChild(lb_winsTitle);

  lb_leaderboard.appendChild(lb_headingsRow)
  firebase.database().ref("Scores").orderByChild("score").limitToLast(3).once('value', (snapshot) => {
    const users = [];
    snapshot.forEach((childSnapshot) => {
      const user = childSnapshot.val();
      users.push(user);
    });

    users.reverse().forEach((user, index) => {
      const tableRow = document.createElement('tr');
      const placementBox = document.createElement('td');
      const gameNameBox = document.createElement('td');
      const winsBox = document.createElement('td');

      placementBox.textContent = index + 1;
      gameNameBox.textContent = user.gameName;
      winsBox.textContent = user.score;

      tableRow.appendChild(placementBox);
      tableRow.appendChild(gameNameBox);
      tableRow.appendChild(winsBox);

      lb_leaderboard.appendChild(tableRow);


    });
  });

}


// function to go back to landing page on leaderboard page html
function lb_backToLanding() {
  window.location.href = "lp_landingPage.html"
}

/**************************************************************/
//    END OF MODULE
/**************************************************************/
