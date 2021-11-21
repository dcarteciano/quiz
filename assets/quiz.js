// declare variables
var timerEl = document.getElementById('timer');
var quizContainer = document.getElementById('quiz');
// function to create the time for the quiz
function timer() {
// variable to declare starting time on the clock
    var timeLeft = 45;
    var timeText = "Time: ";
// check to see if timeLeft = 0, if not then will decrease time left by 1 every second.
    var timeInterval = setInterval(function() {
        timerEl.textContent = timeText.concat(timeLeft);
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            submitQuiz();
        }
        else {
            timeLeft--;
        }
        }, 1000);
}
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var submitButton = document.getElementById('submit-btn');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonEl = document.getElementById('answer-buttons');
var shuffledQuestions, currentQuestionsIndex
var quizText = document.getElementById('quiz-text');
var scoreEl = document.getElementById('score');
var correctEl = document.getElementById('correct-text');
var highscoreSubmitEl = document.getElementById('highscore-input');
var submitScoreButtonEl = document.getElementById('submit-score');
var score = 0;


startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    setNextQuestion()
    removeText()
})
submitButton.addEventListener('click', submitQuiz)
submitScoreButtonEl.addEventListener('click', saveInitials)


function saveInitials() {
var initialsEl = document.getElementById('initials').value;
    localStorage.setItem("initials", initialsEl);
    window.location.href = "./highscores.html";
}

// starts the quiz after the start button is pressed
function startQuiz() {
    startButton.classList.add('hide')
    quizText.classList.add('hide');
    shuffledQuestions = myQuestions.sort(() => Math.random() -.5)
    currentQuestionsIndex = 0;
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
    timer();
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])
}
// function to show the question after the start button is pressed
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonEl.appendChild(button)
        
    })

}
// resets the state of the quiz after every question
function resetState() {

    nextButton.classList.add('hide');
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild (answerButtonEl.firstChild)
    }
}
// function to check if answer is correct
function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);


    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        nextButton.classList.remove('hide');
    }
    else {
        submitButton.classList.remove('hide');
    }
}

// displays if the answer was right or wrong 
function setStatusClass(element, correct) {
    if (correct) {

        quizScore(correct)

    }
    else {
        createText(correct)
    }
}
// function that adds the score of the quiz
function quizScore(correct) {
    createText(correct)
    if (correct === "true") {
        score++;
    }
}
function createText(correct) {
    correctEl.classList.remove('hide')
    if (correct === "true") {
        correctEl.innerHTML = "Correct!"
    }
    else {
        correctEl.innerHTML = "Wrong!"
    };
};
function removeText() {
    correctEl.classList.add('hide')
}
// function to submiz quiz when timer reaches 0
function submitQuiz() {
    questionContainerEl.classList.add('hide')
    submitButton.classList.add('hide')
    var percentScore = score * 20; 
    scoreEl.innerText = "Final Score: " + percentScore + "%";
    correctEl.classList.add('hide')
    highscoreSubmitEl.classList.remove('hide')
    var savedScores = percentScore
    
    localStorage.setItem("highscores", JSON.stringify(savedScores));
}



// Array to hold the questions and if they are correct or not
var myQuestions = [
        {
            question: "Who won the NBA Championship in 2015?",
              answers: [
                  {text: "Chicago Bulls", correct: false},
                  {text: "Los Angelos Lakers", correct: false},
                  {text: "Cleveland Cavaliers", correct: false},
                  {text: "Golden State Warriors", correct: true}
              ],
        },
        {
            question: "Who is the NBA all time leader in Assists?",
               answers: [
                   {text: "Magic Johnson", correct: false},
                   {text: "John Stockton", correct: true},
                   {text: "Jason Kidd", correct: false},
                   {text: "Stephen Curry", correct: false}
               ],
        },
        {
            question: "Who wore the numbers 8 and 24 on the Los Angelos Lakers?",
                answers: [
                    {text: "Kobe Bryant", correct: true},
                    {text: "Michael Jordan", correct: false},
                    {text: "Kevin Durant", correct: false},
                    {text: "LeBron James", correct: false}
                ],
        },
        {
            question: "Who won the regular season MVP award in 2011?",
                answers: [
                    {text: "Ray Allen", correct: false},
                    {text: "Dwayne Wade", correct: false},
                    {text: "Derrick Rose", correct: true},
                    {text: "Russell Westbrook", correct: false}
                ],

        },
        {
            question: "Where did LeBron James play college basketball?",
                answers: [
                    {text: "North Carolina", correct: false},
                    {text: "Duke", correct: false},
                    {text: "Kentucky", correct: false},
                    {text: "He didn't", correct: true}
                ],
        }
    ]