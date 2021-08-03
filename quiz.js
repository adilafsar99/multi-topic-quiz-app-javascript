var startButton = document.getElementById("start-button"); //Button to start the quiz
var userName; //Name of the user
var quizTopicSelect = document.getElementById("quiz-topic-dropdown"); //The quiz type select tag
var quizTopic; // The topic of the quiz
var nextButton = document.getElementById("next-button");
var currentQuestion; // The question displayed
var displayedQuestions = []; // Questions that have been displayed
var userChoice = ""; // The option selected
var userScore = 0; // The quiz score
var totalScore = 100; // The total score
var correctAnswers = 0; // Number of correct answers
var wrongAnswers = 0; // Number of wrong answers
var remarks; // Comments on user's score

var pageName = window.location.pathname; //Current page name

/* Uncomment the line below and check for "/index.html" instead of "/" if you want to run it locally */
//pageName = pageName.slice(pageName.lastIndexOf("/"));

// Home Page Scripts

var isEmpty = true;
var isNumber = true;
if (pageName === "/") {
    sessionStorage.setItem("isLoaded", "");
    sessionStorage.getItem("selectedIndex", "");
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
            nameField.style.backgroundColor = "#ffffff";
            sessionStorage.setItem("userName", nameField.value);
            if (quizTopicSelect.selectedIndex == 0) {
                quizTopicSelect.style.backgroundColor = "#ffe76a";
                quizTopicSelect.style.fontWeight = "bold";
            } else {
                nameField.setAttribute("placeholder", "");
                quizTopicSelect.style.backgroundColor = "#ffffff";
                quizTopicSelect.style.fontWeight = "normal";
                sessionStorage.setItem("selectedIndex", quizTopicSelect.selectedIndex);
                window.location = "questions.html";
            }
        }
    };
}

// Question Page Scripts

if (pageName === "/questions.html") {
    var reloadFlag = sessionStorage.getItem("isLoaded");
    window.onload = function () {
        if (reloadFlag == "true") {
            alert("The quiz was cancelled because you reloaded!");
            window.location = "/";
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
            window.location = "result.html";
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

    /* Countdown clock code - End */

    /* Arrays of different quiz types that hold question objects - Start */

    var arrayOfQuizType1 = [
        {
            question: "Whose standard is ES-262?",
            choices: ["HTML", "Ruby", "Kotlin", "JavaScript"],
            correctChoice: "JavaScript",
        },
        {
            question: "What does &nbsp; does in an HTML page?",
            choices: ["Adds space(s)", "Adds link break", "Adds comma", "Does Nothing"],
            correctChoice: "Adds space(s)",
        },
        {
            question: "What is not a value of the property 'position'?",
            choices: ["absolute", "fixed", "jiggly", "relative"],
            correctChoice: "jiggly",
        },
        {
            question: "What is best for creating responsive sites?",
            choices: ["Float", "Flexbox", "Margin", "Padding"],
            correctChoice: "Flexbox",
        },
        {
            question: "What is called 'sibling selector' in CSS?",
            choices: [".", "+", ">", "~"],
            correctChoice: "+",
        },
        {
            question: "If a local and global variable have the same name, which one will be used inside the function?",
            choices: ["Local", "Global", "Both", "None"],
            correctChoice: "Local",
        },
        {
            question: "What are arrays in JavaScript??",
            choices: ["Arrays", "Square Brackets", "Containers", "Objects"],
            correctChoice: "Objects",
        },
        {
            question: "What does ECMA stand for?",
            choices: ["Every Convenience Made Available", "European Computer Manufacturers Association", "England China Malaysia America?", "It means nothing"],
            correctChoice: "European Computer Manufacturers Association",
        },
        {
            question: "What is localStorage() used for?",
            choices: ["To store data in system memory", "To store data in browser", "Same as sessionStorage()", "To store data in browser without an expiry time"],
            correctChoice: "To store data in browser without an expiry time",
        },
        {
            question: "Can clearInterval() be used inside setInterval()?",
            choices: ["Yes", "No", "Sometimes", "Who cares?"],
            correctChoice: "Yes",
        },
    ];

    var arrayOfQuizType2 = [
        {
            question: "Who is US' current president?",
            choices: ["Donald Trump", "Barrack Obama", "Joe Biden", "Vladimir Putin"],
            correctChoice: "Joe Biden",
        },
        {
            question: "What won the recent presidential election in Iran?",
            choices: ["Husni Mubarak", "Ayatullah Khumenai", "Mahatir Muhammad", "Ibrahim Raisi"],
            correctChoice: "Ibrahim Raisi",
        },
        {
            question: "How many UN members do not recognize Israel?",
            choices: ["10", "50", "28", "192"],
            correctChoice: "28",
        },
        {
            question: "What is the 'Greater Israel' plan?",
            choices: [
                "To make Israel the biggest country in Asia",
                "To make Israel the biggest country in the world",
                "To rebuild the Temple of Suleman A.S. and rule over the land which was part of Hazrat Suleman A.S.' Empire",
                "Just a myth",
            ],
            correctChoice: "To rebuild the Temple of Suleman A.S. and rule over the land which was part of Hazrat Suleman A.S.' Empire",
        },
        {
            question: "Who redesigned Xiaomi's logo??",
            choices: ["Kenya Hara", "Steve Jobs", "Sana Safinaz", "The logo looks the same to me"],
            correctChoice: "Kenya Hara",
        },
        {
            question: "When will Summer Olympics 2020 start?",
            choices: ["23rd July 2021", "7th August 2021", "25th December 2021", "2020 was a year ago"],
            correctChoice: "23rd July 2021",
        },
        {
            question: "What is the name of the 'futuristic' city being built in Saudi Arabia?",
            choices: ["Paradise", "Neom", "Smart City", "There is no such city"],
            correctChoice: "Neom",
        },
        {
            question: "What is the type of Israel's current government?",
            choices: ["Democratic", "Presidential", "Imperial", "Coalition"],
            correctChoice: "Coalition",
        },
        {
            question: "What is the latest 'version' of Covid being called?",
            choices: ["Delta", "Alpha", "Omega", "Beta"],
            correctChoice: "Delta",
        },
        {
            question: "Which of these is the reason for the latest uproar against Facebook?",
            choices: ["Buying Whatsapp", "Changing WhatsApp's privacy policy", "Banning Anti-Israel accounts and posts", "Facebook did nothing wrong"],
            correctChoice: "Banning Anti-Israel accounts and posts",
        },
    ];

    var arrayOfQuizType3 = [
        {
            question: "Who won ICC Champion's Trophy 2017?",
            choices: ["India", "South Africa", "New Zealand", "Pakistan"],
            correctChoice: "Pakistan",
        },
        {
            question: "Won won PSL 2021?",
            choices: ["Lahore Qalandars", "Multan Sultan", "Peshawar Zalmi", "Karachi Kings"],
            correctChoice: "Multan Sultan",
        },
        {
            question: "Ronaldo has won how many European Golden Shoes?",
            choices: ["6", "8", "9", "4"],
            correctChoice: "4",
        },
        {
            question: "When will the next ICC ODI World Cup take place?",
            choices: ["2021", "2022", "2023", "2024"],
            correctChoice: "2023",
        },
        {
            question: "Which of these companies makes sports cars?",
            choices: ["Red Bull", "Nissan", "Apple", "Lamborghini"],
            correctChoice: "Lamborghini",
        },
        {
            question: "Who is the current Snooker World Championship winner?",
            choices: ["Mark Selby", "Shaun Murphy", "Steve Davis", "Stephen Hendry"],
            correctChoice: "Mark Selby",
        },
        {
            question: "Which of these games is not played in Esports competitions?",
            choices: ["League Of Legends", "Dota 2", "Overwatch", "Crazy Taxi"],
            correctChoice: "Crazy Taxi",
        },
        {
            question: "Who holds the record of fastest century in ODI Cricket?",
            choices: ["Martin Guptill", "AB de Villiers", "Shahid Afridi", "Eoin Morgan"],
            correctChoice: "AB de Villiers",
        },
        {
            question: "Who was the runner up in World Tennis Championship 2019?",
            choices: ["Rafael Nadal", "Stefanos Tsitsipas", "Kevin Anderson", "David Goffin"],
            correctChoice: "Stefanos Tsitsipas",
        },
        {
            question: "Why did the World Tennis Championship 2020 not take place?",
            choices: ["Security concerns", "Lack of time", "Covid pandemic", "Other reasons"],
            correctChoice: "Covid pandemic",
        },
    ];

    var arrayOfQuizType4 = [
        {
            question: "What is the number of floors in Burj Khalifa?",
            choices: ["110", "140", "155", "163"],
            correctChoice: "163",
        },
        {
            question: "When was Google founded?",
            choices: ["August 1995", "September 1998", "January 2000", "March 2003"],
            correctChoice: "September 1998",
        },
        {
            question: "Who founded Calculus in the 17th century?",
            choices: ["Isaac Newton and Gottfried Leibniz", "Thomas Edison and Albert Einstein", "Neil Bohr and J.J. Thomson", "Guglielmo Marconi and Alexander Bell"],
            correctChoice: "Isaac Newton and Gottfried Leibniz",
        },
        {
            question: "How fast is light?",
            choices: ["300000000 m/s", "30000 km/s", "1200 km/h", "333 m/s"],
            correctChoice: "300000000 m/s",
        },
        {
            question: "What is the name of our galaxy?",
            choices: ["Andromeda", "Pinwheel", "Milky Way", "Cigar"],
            correctChoice: "Milky Way",
        },
        {
            question: "Which company came to India in the 1600s?",
            choices: ["Coca Cola", "Nestle", "East India Company", "Meezan"],
            correctChoice: "East India Company",
        },
        {
            question: "What is the word VIBGYOR used for?",
            choices: ["Colors of atoms", "Colors of flowers", "Colors of rainbow", "Frequency of light"],
            correctChoice: "Colors of rainbow",
        },
        {
            question: "How many stars are in the flag of US?",
            choices: ["50", "60", "70", "80"],
            correctChoice: "50",
        },
        {
            question: "What does HEC stand for?",
            choices: ["Higher Education Committee", "Higher Education Community", "Higher Economics Council", "Higher Education Commission"],
            correctChoice: "Higher Education Commission",
        },
        {
            question: "What is the most prominent event of 1857?",
            choices: ["Earthquake in California", "War of Independence in India", "Founding of National Association of Baseball Players", "US' issuance of flying eagle cents"],
            correctChoice: "War of Independence in India",
        },
    ];

    /* Arrays of different quiz types that hold question objects - End */

    // Array that holds arrays of the different quiz types
    var arrayOfQuizTypes = [];
    arrayOfQuizTypes.push(arrayOfQuizType1, arrayOfQuizType2, arrayOfQuizType3, arrayOfQuizType4);

    // Array that holds the chosen quiz type's question objects
    quizTopic = parseInt(sessionStorage.getItem("selectedIndex")) - 1;

    // If the user comes back from the result page
    if (sessionStorage.getItem("selectedIndex") == "" || sessionStorage.getItem("selectedIndex") == null) {
        arrayOfQuestions = arrayOfQuizTypes[3];
    }
    // If the user comes from the home page
    else {
        arrayOfQuestions = arrayOfQuizTypes[quizTopic];
    }

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
        var quizTopicHeadings = ["Web Development", "World Affairs", "Sports", "General Knowledge"];
        var quizTopicHeading = document.getElementById("quiz-topic-heading");
        if (sessionStorage.getItem("selectedIndex") == "" || sessionStorage.getItem("selectedIndex") == null) {
            quizTopicHeading.innerText = quizTopicHeadings[3];
        } else {
            quizTopicHeading.innerText = quizTopicHeadings[quizTopic];
        }
        var qNumber = document.querySelector("#question-heading");
        qNumber.innerText = "Question " + displayedQuestions.length;
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
            alert("Wrong! The correct answer is " + qObject.correctChoice + ".");
        }
        if (displayedQuestions.length < 10) {
            userChoice.style.backgroundColor = "inherit";
            nextButton.disabled = true;
            generateQuestion();
            displayQuestion();
        } else {
            sessionStorage.setItem("quizTopicHeading", document.querySelector("#quiz-topic-heading").innerText);
            sessionStorage.setItem("correctAnswers", correctAnswers);
            sessionStorage.setItem("wrongAnswers", wrongAnswers);
            sessionStorage.setItem("userScore", userScore);
            window.location = "result.html";
        }
    };

    generateQuestion();
    displayQuestion();
}

// Result Page Scripts

if (pageName === "/result.html") {
    function showResult() {
        document.getElementById("quiz-topic-heading").innerText = sessionStorage.getItem("quizTopicHeading");
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
