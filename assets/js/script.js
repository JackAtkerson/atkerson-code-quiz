var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('timer');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

var currentQuestionsIndex = 0;
var time = questions.length * 15;
var timerId;

var questions = [
    {
        question: 'Choose the correct HTML element for the largest heading:',
        answers: [
            {text: '<h6>', correct: false},
            {text: '<h4>', correct: false},
            {text: '<header>', correct: false},
            {text: '<h1>', correct: true}
        ]
    },
    {
        question: 'Which of the following will open a link in a new tab?',
        answers: [
            {text: '<a href="url" target="_blank">', correct: true},
            {text: '<a href="url" target="new_tab">', correct: false},
            {text: '<a href="url" target="new">', correct: false},
            {text: '<a href="url" target="blank">', correct: false}
        ]
    },
    {
        question: 'Which property is used to change the font of an element?',
        answers: [
            {text: 'font-weight', correct: false},
            {text: 'font-family', correct: true},
            {text: 'font', correct: false},
            {text: 'font-style', correct: false}
        ]
    },
    {
        question: 'How do you call a function named "coolFunction"?',
        answers: [
            {text: 'call coolFunction()', correct: false},
            {text: 'call(function, coolFunction)', correct: false},
            {text: 'coolFunction()', correct: true},
            {text: 'coolFunction.call', correct: false}
        ]
    },
    {
        question: 'How do you add a comment in JavaScript?',
        answers: [
            {text: '<!-- Comment here -->', correct: false},
            {text: '//Comment here', correct: true},
            {text: '<comment> Comment here </comment>', correct: false},
            {text: '~Comment here~', correct: false}
        ]
    }
];

function timer() {
    timeLeft--;
    timerEl.textContent = 'Time Remaining: ' + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
};

function startQuiz() {
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestion();
};

function getQuestion() {
    var currentQuestion = questions[currentQuestionsIndex];

    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);

        choiceNode.textContent = i + 1 + '.' + choice;

        choiceNode.onclick = questionClick;
        choicesEl.appendChild(choiceNode);
    });
};

function questionClick() {
    if (this.value !== questions[currentQuestionsIndex].answer) {
        time -= 15;

        if (time<0) {
            time = 0;
        }

        timerEl.textContent = time;
        feedbackEl.textContent = jkf;
    }
}