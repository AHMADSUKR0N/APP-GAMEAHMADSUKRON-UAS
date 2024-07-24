// Data pertanyaan
const questions = [
    {
        question: "gambar di atas di sebut Resistor Fixed berjenis?",
        answers: ["carbon composition ", "carbon film", "metal film", "trimpot"], correct: 0, image: "assets/IMAGE/resisitorkarbon.jpg"
    },
    {
        question: "gambar di atas di sebut Resistor Fixed berjenis?",
        answers: ["carbon composition ", "carbon film", "metal film", "trimpot"], correct: 1, image: "assets/IMAGE/carbonfilm.jpg"
    },
    {
        question: "gambar di atas di sebut Resistor Fixed berjenis?",
        answers: ["carbon composition ", "carbon film", "metal film", "trimpot"], correct: 2, image: "assets/IMAGE/metalfilm.jpg"
    },
    {
        question: "gambar di atas di sebut Resistor variable berjenis?",
        answers: ["potensiometer", "trimpot", "rheostat", "metal film"], correct: 3, image: "assets/IMAGE/potensiometer.jpg"
    },
    {
        question: "gambar di atas di sebut Resistor variable berjenis?",
        answers: ["trimpot", "potensiometer", "rheostat", "metal film"], correct: 0, image: "assets/IMAGE/trimpot.jpg"
    },
    {
        question: "gambar di atas di sebut Resistor variable berjenis?",
        answers: ["potensiometer", "rheostat", "trimpot", "metal film"], correct: 1, image: "assets/IMAGE/rheostat.jpg"
    },
    {
        question: "di dalam rheostat ada beberapa jenis , gambar di atas di sebut resistor rheostat jenis?",
        answers: ["rheostat rotary", "rheostat trimmer", "rheostat slinder", "rheostat carbon"], correct: 2, image: "assets/IMAGE/rheostatslinde.jpg"
    },
    {
        question: "di dalam rheostat ada beberapa jenis , gambar di atas di sebut resistor rheostat jenis?",
        answers: ["rheostat carbon ", "rheostat carbon", "rheostat slinder", "rheostat trimmer"], correct: 3, image: "assets/IMAGE/rheostattrimmer.jpg"
    },
    {
        question: "gambar di atas di sebut Resistor Fixed berjenis?",
        answers: ["surface mount", "carbon composition", "metal film", "carbon film"], correct: 0, image: "assets/IMAGE/surfacemount.jpg"
    },
    {
        question: "di dalam potensiometer ada beberapa jenis , gambar di atas di sebut resistor potensiometer jenis?",
        answers: ["potensiometer rotay", "potensiometer trimmer", "potensiometer slinder ", "potensiometer Induktor"], correct: 1, image: "assets/IMAGE/potensiometerrotay.jpg"
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 120;
let timerInterval;
let results = [];
let currentLevel = 2; // Track the current level

// Fungsi startGame
function startGame() {
    document.getElementById('timer').innerText = timer;
    loadQuestion();
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert('Game Over! Waktu Habis.');
            showScore();
            window.location.replace("frontpage.html");
        }
    }, 1000);
}

// Fungsi loadQuestion
function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = questionData.question;
    document.getElementById('question-image').src = questionData.image;
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach((button, index) => {
        button.innerText = questionData.answers[index];
    });
}

// Fungsi checkAnswer
function checkAnswer(index) {
    const correctAnswerIndex = questions[currentQuestionIndex].correct;
    const isCorrect = index === correctAnswerIndex;
    results.push({ question: questions[currentQuestionIndex].question, selected: index, correct: correctAnswerIndex, isCorrect });
    
    if (isCorrect) {
        alert('Benar! Klik OK untuk melanjutkan!');
        score += 10;
    } else {
        alert('Jawaban salah, Klik OK untuk lanjutkan ke pertanyaan berikutnya.');
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        if (currentQuestionIndex % 10 === 0) {
            clearInterval(timerInterval);
            showScore();
            document.getElementById('continue-button-container').classList.remove('hidden');
        } else {
            loadQuestion();
        }
    } else {
        clearInterval(timerInterval);
        showScore();
        alert('Anda telah menyelesaikan semua soal!');
        showResults();
    }
}

// Fungsi showScore
function showScore() {
    alert(`Sekormu di level ini ${score}.`);
    if (currentQuestionIndex %  10 === 0 || currentQuestionIndex >= questions.length) {
        const level = currentLevel;
        localStorage.setItem(`level${level}Score`, score);
        currentLevel++;
        if (currentLevel > 4) {
            alert('Anda telah menyelesaikan semua level!');
            window.location.replace("level.html");
        } else {
            document.getElementById('continue-button-container').classList.remove('hidden');
            document.getElementById('continue-button').innerText = "Lanjutkan Level Selanjutnya";
        }
    }
}

// Fungsi continueGame
function continueGame() {
    if (currentQuestionIndex < questions.length) {
        document.getElementById('continue-button-container').classList.add('hidden');
        timer = 120; // Reset timer for the next level
        startGame();
    } else {
        window.location.href = 'level.html';
    }
}

// Fungsi goToMenu
function goToMenu() {
    window.location.replace("frontpage.html");
}

// Fungsi showResults
function showResults() {
    let resultText = "Hasil Jawaban:\n";
    results.forEach((result, index) => {
        resultText += `Pertanyaan ${index + 1}: ${result.question}\n`;
        resultText += `Jawaban Anda: ${questions[index].answers[result.selected]} (${result.isCorrect ? "Benar" : "Salah"})\n`;
        resultText += `Jawaban Benar: ${questions[index].answers[result.correct]}\n\n`;
    });
    alert(resultText);
}

startGame();