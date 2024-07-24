// Data pertanyaan
const questions = [
    {
        question: "di dalam potensiometer ada beberapa jenis , gambar di atas di sebut resistor potensiometer jenis?",
        answers: ["potensiometer slinder", "potensiometer rotay", "potensiometer trimmer", "potensiometer Induktor"], correct: 0, image: "assets/IMAGE/potensiometerslinder.jpg"
    },
    {
        question: "di dalam potensiometer ada beberapa jenis , gambar di atas di sebut resistor potensiometer jenis?",
        answers: ["potensiometer rotay", "potensiometer trimmer", "potensiometer slinder", "potensiometer Induktor"], correct: 1, image: "assets/IMAGE/potensiometertrimmer.jpg"
    },
    {
        question: "gambar di atas di sebut  THERMISTOR (THERMAL RESISTOR) berjenis?",
        answers: ["NTC", "LDR", "PTC", "PNP"], correct: 2, image: "assets/IMAGE/ptc.jpg"
    },
    {
        question: "gambar di atas di sebut  THERMISTOR (THERMAL RESISTOR) berjenis?",
        answers: ["LDR", "PTC", "PNP", "NTC"], correct: 3, image: "assets/IMAGE/ntc.jpg"
    },
    {
        question: "gambar di atas di sebut resistor yang memiliki kepekaan tinggi terhadap intensitas cahaya bernama resistor?",
        answers: ["LDR", "NTC", "PNP", "PTC"], correct: 0, image: "assets/IMAGE/ldr.jpg"
    },
    {
        question: "gambar di atas di sebut  kapasitor fixed berjenis?",
        answers: ["kapasitor polyester", "kapasitor keramik", "kapasitor kertas", "kapasitor mika"], correct: 1, image: "assets/IMAGE/kapasitorkeramik.jpg"
    },
    {
        question: "gambar di atas di sebut  kapasitor fixed berjenis?",
        answers: ["kapasitor polyester", "kapasitor keramik", "kapasitor kertas", "kapasitor mika"], correct: 2, image: "assets/IMAGE/kapasitorkertas.jpg"
    },
    {
        question: "gambar di atas di sebut  kapasitor fixed berjenis?",
        answers: ["kapasitor polyester", "kapasitor keramik", "kapasitor kertas", "kapasitor mika"], correct: 3, image: "assets/IMAGE/kapasitormika.jpg"
    },
    {
        question: "gambar di atas di sebut  kapasitor fixed berjenis?",
        answers: ["kapasitor polyester", "kapasitor keramik", "kapasitor kertas", "kapasitor mika"], correct: 0, image: "assets/IMAGE/kapasitorpolyester.jpg"
    },
    {
        question: "gambar di atas di sebut  kapasitor fixed berjenis?",
        answers: ["kapasitor polyester", "kapasitor elektrolit", "kapasitor tantalum", "kapasitor mika"], correct: 1, image: "assets/IMAGE/kapasitorelektrolit.jpg"
    },
    {
        question: "gambar di atas di sebut  kapasitor fixed berjenis?",
        answers: ["kapasitor polyester", "kapasitor elektrolit", "kapasitor tantalum", "kapasitor mika"], correct: 2, image: "assets/IMAGE/kapasitortantalum.jpg"
    },
    {
        question: "gambar di atas di sebut komponen dioda berjenis?",
        answers: ["dioda laser", "dioda tunnel", "dioda bridge", "dioda varactor"], correct: 3, image: "assets/IMAGE/diodavaractor.jpg"
    },
    {
        question: "gambar di atas di sebut komponen dioda berjenis?",
        answers: ["dioda led", "dioda tunnel", "dioda bridge", "dioda varactor"], correct: 0, image: "assets/IMAGE/diodaled.jpg"
    },
    {
        question: "gambar di atas di sebut  kapasitor variable berjenis?",
        answers: ["kapasitor polyester", "kapasitor varco", "kapasitor tantalum", "kapasitor mika"], correct: 1, image: "assets/IMAGE/kapasitorvarco.jpg"
    },
    {
        question: "gambar di atas di sebut  kapasitor variable berjenis?",
        answers: ["kapasitor polyester", "kapasitor elektrolit", "kapasitor trimmer", "kapasitor mika"], correct: 2, image: "assets/IMAGE/kapasitortrimmer.jpg"
    },
    {
        question: "di dalam rheostat ada beberapa jenis , gambar di atas di sebut resistor rheostat jenis?",
        answers: ["rheostat carbon", "rheostat trimmer", "rheostat slinder", "rheostat rotary"], correct: 3, image: "assets/IMAGE/rheostatrotary.jpg"
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 120;
let timerInterval;
let results = [];
let currentLevel = 3; // Track the current level

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
        if (currentQuestionIndex % 16 === 0) {
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
    if (currentQuestionIndex % 16 === 0 || currentQuestionIndex >= questions.length) {
        const level = currentLevel;
        localStorage.setItem(`level${level}Score`, score);
        currentLevel++;
        if (currentLevel > 4) {
            alert('Anda telah menyelesaikan semua level!');
            window.location.href = 'level.html';
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
        window.location.replace("level.html");
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