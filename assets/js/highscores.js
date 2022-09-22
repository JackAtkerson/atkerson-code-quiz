var highScore = document.querySelector('#highscores');
var goBack = document.querySelector('#goBack');

var allScores = localStorage.getItem('allScores');
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i=0; i < allScores.length; i++) {
        var createLi = document.createElement('li');
        createLi.textContent = allScores[i].initials + '' + allScore[i].score;
        highScore.appendChild(createLi);
    }
};