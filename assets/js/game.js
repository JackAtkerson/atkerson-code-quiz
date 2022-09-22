var questions = [
    {
        question: 'Which of these is not a semantic HTML element?',
        choices: ['<article>', '<nav>', '<link>', '<section>'],
        answer: '<link>'
    },
    {
        question: 'How do you add a comment in JavaScript?',
        choices: ['//Comment Here', '<!-- Comment Here -->', '/ Comment Here /', '<comment> Comment Here </comment>'],
        answer: '//Comment Here'
    },
    {
        question: 'Which of the following commands is used to create and move to a new git branch?',
        choices: ['$git merge', '$git push origin main', '$git branch', '$git checkout -b <branch-name>'],
        answer: '$git checkout -b <branch-name>'
    },
    {
        question: 'Where should you link style sheets in an HTML document?',
        choices: ['In the <footer>', 'In the <head>', 'At the bottom of the <body>', 'It does not matter'],
        answer: 'In the <head>'
    },
    {
        question: 'How do you find the number with the highest value of x and y?',
        choices: ['top(x,y)', 'ceil(x,y)', 'Math.ceil(x,y)', 'Math.max(x,y)'],
        answer: 'Math.max(x,y)'
    }
];

var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector('#currentTime');
var timer = document.querySelector('#startTime');
var questionsDiv = document.querySelector('#questionsDiv');
var container = document.querySelector('#container');

var secondsLeft = 75;
var holdInterval = 0;
var wrong = 10;
var ulCreate = document.createElement('ul');

timer.addEventListener('click', function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                finish();
                currentTime.textContent = 'Out of time';
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for ( var i=0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement('li');
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener('click', (compare));
    })
};

function compare(event) {
    var element = event.target;

    if (element.matches('li')) {
        var createDiv = document.createElement('div');
        createDiv.setAttribute('id', 'createDiv');
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = 'Correct!';
        } else {
            secondsLeft = secondsLeft - wrong;
            createDiv.textContent = 'Wrong answer!';
        }
    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        finish();
        createDiv.textContent = 'Finished!' + 'You scored ' + score + '/' + questions.length + 'correct.';
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
};

function finish() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

};