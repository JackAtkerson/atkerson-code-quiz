var startBtn = document.getElementById('start');
var submitBtn = document.getElementById('submit');
var nextBtn = document.getElementById('next');
var answerChoiceBtn = document.getElementById('answer');
var questionEl = document.getElementById('question');
var timerEl = document.getElementById('timer');
var choicesEl = document.getElementById('choices');
var checkAnswerEl = document.getElementById('check-answer');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var scoreCardEl = document.getElementById('scorecard');
var viewHighScores = document.getElementById('high-scores');
var scores = JSON.parse(localStorage.getItem('startpagescores')) || [];

var currentQuestionIndex;
var shuffledQuestions;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
}); 

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

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

    timer();
    getQuestion();
};

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

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

function resetState() {
    nextButton.classList.add('hide')
    checkAnswerEl.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
};

function selectAnswer(e) {
    var selectedAnswer = e.target;
    var correct = selectedAnswer.dataset.correct;
    feedbackEl.classList.remove('hide')

    if (correct) {
        feedbackEl.innerHTML = "Correct!";
    } else {
        feedbackEl.innerHTML = "Wrong!";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            timeLeft -=10;
        }
    }

    Array.from(asnwerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
        checkAnswerEl.classList.remove('hide')
    } else {
        startButton.classList.remove('hide')
        saveScore();
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
};

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
};

function saveScore() {
    clearInterval(timerId);
    timerEl.textContent = 'Time Remaining: ' + timeLeft;
    setTimeout(function () {
        questionContainerEl.classList.add('hide');
        document.getElementById('scorecontainer').classList.remove('hide');
        document.getElementById('scoreCardEl').textContent = 'You scored: ' + timeLeft;
    }, 1000)
};

