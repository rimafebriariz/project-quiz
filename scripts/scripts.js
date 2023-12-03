//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let nameField = document.getElementById("name");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [{
        id: "0",
        question: "Dalam menyusun suatu program, langkah pertama yang harus di lakukan adalah? ",
        options: ["Membuat Program", "Membuat Algoritma", "Membeli Komputer", "Proses","Mempelajari Program"],
        correct: "Membuat Algoritma",
    },
    {
        id: "1",
        question: "Urutan langkah-langkah logis untuk menyelesaikan masalah yang disusun secara sistematis disebut... ",
        options: ["Algoritma", "Flowchart", "Variable", "Tipe Data","Konstanta"],
        correct: "Algoritma",
    },
    {
        id: "2",
        question: "Model penulisan dan perancangan algoritma menggunakan simbol bangun ruang dalam mempresentasikan proses program disebut....",
        options: ["Natural Language", "Bahasa narasi", "Bahasa alami", "Pseudocode","Flowchart"],
        correct: "Flowchart",
    },
    {
        id: "3",
        question: "Yang menunjukan awal dan akhir pada sebuah flowchart adalah...",
        options: ["Data Flow", "Data", "Terminator", "Decision","Proses"],
        correct: "Terminator",
    },
    {
        id: "4",
        question: "Bentuk belah ketupat pada diagram flowchart diberi nama...",
        options: ["Data Flow", "Data", "Terminator", "Decision", "Proses"],
        correct: "Decision",
    },
    {
        id: "5",
        question: "Int x = 3.05;, tipe data yang digunakan adalah...",
        options: ["Char", "Long int", "Float", "Short int", "Signed long int"],
        correct: "Float",
    },
    {
        id: "6",
        question: "Variabel yang digunakan untuk mengidentifikasi data yang nilainya sudah ditentukan dan tidak dapat diubah saat program berjalan disebut...",
        options: ["Konstanta", "Label", "Tipe", "Variabel", "Prosedur"],
        correct: "Konstanta",
    },
    {
        id: "7",
        question: "Dibawah ini merupakan tipe data bilangan bulat adalah...",
        options: ["Char", "Double", "Float", "Int", "Boolean"],
        correct: "Int",
    },
    {
        id: "8",
        question: "Tipe data bahasa C++ untuk true false adalah...",
        options: ["String", "Char", "Boolean", "Byte", "Real"],
        correct: "Boolean",
    },
    
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[4]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    let name = prompt("Insert Your Name: ");
    nameField.innerHTML = name;
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};