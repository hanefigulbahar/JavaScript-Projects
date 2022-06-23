function Question(text, choices, answer) {
    this.text = text
    this.choices = choices
    this.answer = answer
}

Question.prototype.checkAnswer = function(answer) {
    return this.answer === answer
}


// Quiz Constructor
function Quiz(question) {
    this.question = question
    this.score = 0
    this.questionIndex = 0
}


//Quiz Prototype

Quiz.prototype.getQuestion = function() {
    return this.question[this.questionIndex]

}

//Quiz isFinish

Quiz.prototype.isFinish = function() {
    return this.question.length === this.questionIndex
}

//Quiz guess 
Quiz.prototype.guess = function(answer) {
    var question = this.getQuestion()
    if (question.checkAnswer(answer)) {
        this.score++

    }
    this.questionIndex++
}






let q1 = new Question("What's  ?", ["a", "b", "c", "d"], "b")
let q2 = new Question("What's questions ?", ["a", "b", "c", "d"], "a")
let q3 = new Question("What's questiona aaaaa ?", ["a", "b", "c", "d"], "c")


var question = [q1, q2, q3]

//Start Quiz

var quiz = new Quiz(question)


loadQuestion()

function loadQuestion() {
    if (quiz.isFinish()) {
        showScore()
    } else {
        var question = quiz.getQuestion()
        var choices = question.choices
        document.querySelector('#question').textContent = question.text
        for (let i = 0; i < choices.length; i++) {
            var element = document.querySelector('#choice' + i)
            element.innerHTML = choices[i]

            guess('btn' + i, choices[i])
        }
        showProgress()
    }
}

function showScore() {
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`

    document.querySelector('.card-body').innerHTML = html

}

function guess(id, guess) {
    var btn = document.getElementById(id)
    btn.onclick = function() {
        quiz.guess(guess)
        loadQuestion()
    }
}

function showProgress() {
    var totalQuestion = quiz.question.length
    var questionNumber = quiz.questionIndex + 1
    document.querySelector('#progress').innerHTML = 'Question ' + questionNumber + ' of ' + totalQuestion;
}