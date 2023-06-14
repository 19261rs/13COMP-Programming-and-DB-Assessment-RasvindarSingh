
// leaderbord code --> retrieves score data from fb and sorts out in order from highest to lowest
function lb_getLeaderboard(){
  const lb_leaderboard = document.getElementById("leaderboard");
  lb_leaderboard.innerHTML = "";

  const lb_headingsRow = document.createElement('tr');
  const lb_placementTitle = document.createElement('th');
  const lb_gameNameTitle =  document.createElement('th');
  const lb_winsTitle =  document.createElement('th');

  lb_placementTitle.textContent = "placement"
  lb_gameNameTitle.textContent = "game name";
  lb_winsTitle.textContent = "wins";

  lb_headingsRow.appendChild(lb_placementTitle);
  lb_headingsRow.appendChild(lb_gameNameTitle);
  lb_headingsRow.appendChild(lb_winsTitle);

  lb_leaderboard.appendChild(lb_headingsRow)
  firebase.database().ref("Scores").orderByChild("score").limitToLast(3).once('value',(snapshot) => {
    const users = [];
    snapshot.forEach((childSnapshot) => {
      const user = childSnapshot.val();
      users.push(user);
    });

    users.reverse().forEach((user, index) => {
      const tableRow = document.createElement('tr');
    const  placementBox = document.createElement('td');
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

function lb_backToLanding() {
  window.location.href="lp_landingPage.html"
}

