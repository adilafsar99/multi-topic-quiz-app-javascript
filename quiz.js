var startButton = document.getElementById("start-button"); //Button to start the quiz
var userName; //Name of the user
var nextButton = document.getElementById("next-button");
var currentQuestion; // The question displayed
var displayedQuestions = []; // Questions that have been displayed
var userChoice = ""; // The option selected
var userScore = 0; // The quiz score
var totalScore = 100; // The total score
var correctAnswers = 0; // Number of correct answers
var wrongAnswers = 0; // Number of wrong answers
var remarks; // Comments on user's score
var hostName = window.location.toString(); //Current file path
var pageName = hostName.slice(hostName.lastIndexOf("/") + 1); //Current page name





document.write(pageName);
// Home Page Scripts

var isEmpty = true;
var isNumber = true;
if (pageName === "") {
    sessionStorage.setItem("isLoaded", "");
    startButton.onclick = function checkForName() {
        var nameField = document.getElementById("name-field");
        if (nameField.value.length !== 0) {
            for (var i = 0; i < nameField.value.length; i++) {
                if (nameField.value[i] != " ") {
                    isEmpty = false;
                    break;
                }
            }
            if (nameField.value != Number(nameField.value)) {
                isNumber = false;
            }
        }
        if (isEmpty) {
            nameField.setAttribute("placeholder", "Input field is empty!");
            nameField.value = "";
            nameField.focus();
            nameField.style.backgroundColor = "#ffe76a";
        } else if (isNumber) {
            nameField.setAttribute("placeholder", "Input can't have numbers!");
            nameField.value = "";
            nameField.focus();
            nameField.style.backgroundColor = "#ffe76a";
            isEmpty = true;
        } else {
            nameField.setAttribute("placeholder", "");
            nameField.style.backgroundColor = "#ffffff";
            sessionStorage.setItem("userName", nameField.value);
            window.location = hostName + "questions.html";
        }
    };
}

// Question Page Scripts

if (pageName === "questions.html") {
    var reloadFlag = sessionStorage.getItem("isLoaded");
    window.onload = function () {
        if (reloadFlag == "true") {
            alert("The quiz was cancelled because you reloaded!");
            window.location = hostName;
        }
    };

    sessionStorage.setItem("isLoaded", "true");
    var qObject; //The current question object

    /* Countdown clock code - Start */

    var remainingTime = 120; //Seconds remaining
    var minutes = Math.floor(remainingTime / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var seconds = remainingTime % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var minutesP = document.getElementById("minutes"); // Remaining minutes para
    minutesP.innerText = minutes;
    var secondsP = document.getElementById("seconds"); // Remaining seconds para
    secondsP.innerText = ":" + seconds;

    /* Method that calculates and displays the remaining time - Start */
    var countdownClock = setInterval(function () {
        remainingTime -= 1;
        minutes = Math.floor(remainingTime / 60);
        seconds = remainingTime % 60;
        if (remainingTime == 0) {
            clearInterval(countdownClock);
            if (userChoice.innerText == qObject.correctChoice) {
                userScore += 10;
                correctAnswers += 1;
            } else if (userChoice != "") {
                wrongAnswers += 1;
            }
            sessionStorage.setItem("correctAnswers", correctAnswers);
            sessionStorage.setItem("wrongAnswers", wrongAnswers);
            sessionStorage.setItem("userScore", userScore);
            window.location = hostName + "result.html";
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        minutesP.innerText = minutes;
        secondsP.innerText = ":" + seconds;
    }, 1000);

    var arrayOfQuestions = [
        {
            question: "What comes after A?",
            choices: ["B", "C", "D", "E"],
            correctChoice: "B",
        },
        {
            question: "What comes after B?",
            choices: ["C", "D", "E", "F"],
            correctChoice: "C",
        },
        {
            question: "What comes after C?",
            choices: ["D", "E", "F", "G"],
            correctChoice: "D",
        },
        {
            question: "What comes after D?",
            choices: ["E", "F", "G", "H"],
            correctChoice: "E",
        },
        {
            question: "What comes after E?",
            choices: ["F", "G", "H", "I"],
            correctChoice: "F",
        },
        {
            question: "What comes after F?",
            choices: ["G", "H", "I", "J"],
            correctChoice: "G",
        },
        {
            question: "What comes after G?",
            choices: ["H", "I", "J", "K"],
            correctChoice: "H",
        },
        {
            question: "What comes after H?",
            choices: ["I", "J", "K", "L"],
            correctChoice: "I",
        },
        {
            question: "What comes after I?",
            choices: ["J", "K", "L", "M"],
            correctChoice: "J",
        },
        {
            question: "What comes after J?",
            choices: ["K", "L", "M", "N"],
            correctChoice: "K",
        },
    ];
    nextButton.disabled = true;

    function generateQuestion() {
        var randomNum;
        if (displayedQuestions.length > 0) {
            while (displayedQuestions.indexOf(randomNum) !== -1 || typeof randomNum === "undefined") {
                randomNum = Math.round(Math.random() * 9);
            }
        } else {
            randomNum = Math.round(Math.random() * 9);
        }
        displayedQuestions.push(randomNum);
        qObject = arrayOfQuestions[randomNum];
    }

    function displayQuestion() {
        var heading = document.querySelector("#question-heading");
        heading.innerText = "Question " + displayedQuestions.length;
        var question = document.getElementById("question-text");
        question.innerText = qObject.question;
        var choiceTexts = document.getElementsByClassName("choice-text");
        for (var i = 0; i < choiceTexts.length; i++) {
            choiceTexts[i].innerText = qObject.choices[i];
        }
    }

    function recordChoice(choice) {
        var choicesDiv = document.getElementsByClassName("choice-div");
        userChoice = choice;
        for (var i = 0; i < choicesDiv.length; i++) {
            if (choicesDiv[i].id === userChoice.id) {
                choice.style.backgroundColor = "#9a9a9a";
            } else {
                choicesDiv[i].style.backgroundColor = "inherit";
            }
        }
        nextButton.disabled = false;
    }

    nextButton.onclick = function nextPage() {
        if (userChoice.innerText == qObject.correctChoice) {
            userScore += 10;
            correctAnswers += 1;
        } else {
            wrongAnswers += 1;
        }
        if (displayedQuestions.length < 10) {
            userChoice.style.backgroundColor = "inherit";
            nextButton.disabled = true;
            generateQuestion();
            displayQuestion();
        } else {
            sessionStorage.setItem("correctAnswers", correctAnswers);
            sessionStorage.setItem("wrongAnswers", wrongAnswers);
            sessionStorage.setItem("userScore", userScore);
            window.location = hostName + "result.html";
        }
    };

    generateQuestion();
    displayQuestion();
}

// Result Page Scripts

if (pageName === "result.html") {
    function showResult() {
        document.getElementById("username").innerText = " " + sessionStorage.getItem("userName");
        document.getElementById("correct-answers").innerText = " " + sessionStorage.getItem("correctAnswers");
        document.getElementById("wrong-answers").innerText = " " + sessionStorage.getItem("wrongAnswers");
        document.getElementById("numbers").innerText = " " + sessionStorage.getItem("userScore");
    }
    if (parseInt(sessionStorage.getItem("userScore")) < 50) {
        remarks = "Sorry, You failed!";
    } else {
        remarks = "Congratulations, You passed!";
    }
    document.getElementById("remarks").innerText = remarks;

    showResult();
}
