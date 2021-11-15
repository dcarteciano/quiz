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
//timer();


// function to submiz quiz when timer reaches 0
function submitQuiz() {
    document.location.href = "./highscores.html";
}

var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonEl = document.getElementById('answer-buttons');
var shuffledQuestions, currentQuestionsIndex

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    setNextQuestion()
})

// starts the quiz after the start button is pressed
function startQuiz() {
    startButton.classList.add('hide')
    shuffledQuestions = myQuestions.sort(() => Math.random() -.5)
    currentQuestionsIndex = 0;
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
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
        startButton.innerText = 'Submit'
        startButton.classList.remove('hide');
    }
    console.log(correct)

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass (element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
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