const questions = [
    {
        question: "hitunglah warna gelang resistor pada gambar di atas!",
        answers: ["1000ohm", "1500ohm", "5000ohm", "35000ohm"], correct: 0, image: "assets/IMAGE/1000ohm.jpg"
    },
    {
        question: "hitunglah warna gelang resistor pada gambar di atas!",
        answers: ["450ohm", "220ohm", "250ohm", "300ohm"], correct: 1, image: "assets/IMAGE/220ohm.jpg"
    },
    {
        question: "hitunglah warna gelang resistor pada gambar di atas!",
        answers: ["55ohm", "44ohm", "33ohm", "10ohm"], correct: 2, image: "assets/IMAGE/33ohm.jpg"
    },
    {
        question: "hitunglah warna gelang resistor pada gambar di atas!",
        answers: ["3500ohm", "6000ohm", "7500ohm", "4700ohm"], correct: 3, image: "assets/IMAGE/4700ohm.jpg"
    },
    {
        question: "hitunglah warna gelang resistor pada gambar di atas!",
        answers: ["5600ohm", "6500ohm", "5400ohm", "10000ohm"], correct: 0, image: "assets/IMAGE/5600ohm.jpg"
    },
    {
        question: "hitulang rensistansi di dalam rangkaian seri tersebut!",
        answers: ["7 ohm", "6 ohm", "8 ohm", "9 ohm"], correct: 1, image: "assets/IMAGE/rensistansi2buah.jpg"
    },
    {
        question: "hitulang arus di dalam rangkaian seri tersebut!",
        answers: ["1,5 A", "5 A", "2 A", "2,5 A"], correct: 2, image: "assets/IMAGE/rensistansi2buah.jpg"
    },
    {
        question: "hitulang rensistansi di dalam rangkaian seri tersebut!",
        answers: ["4000ohm", "7000ohm", "1200ohm", "6000ohm"], correct: 3, image: "assets/IMAGE/rensistansi3buah.jpg"
    },
    {
        question: "hitulang arus di dalam rangkaian seri tersebut!",
        answers: ["2 A", "5 A", "3 A", "8 A"], correct: 0, image: "assets/IMAGE/rensistansi3buah.jpg"
    },
    {
        question: "hitulang voltase di dalam rangkaian seri tersebut!",
        answers: ["5 V", "8 V", "4 V", "7 V"], correct: 1, image: "assets/IMAGE/rensistansi3buah.jpg"
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 600;
let timerInterval;
let results = [];
let currentLevel = 4;

function startGame() {
    document.getElementById('timer').innerText = timer;
    loadQuestion();
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert('Game Over! Waktunya Selesai.');
            showScore();
            window.location.href = 'frontpage.html';
        }
    }, 1000);
}

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = questionData.question;
    document.getElementById('question-image').src = questionData.image;
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach((button, index) => {
        button.innerText = questionData.answers[index];
    });
}

function checkAnswer(index) {
    const correctAnswerIndex = questions[currentQuestionIndex].correct;
    const isCorrect = index === correctAnswerIndex;
    results.push({
        question: questions[currentQuestionIndex].question,
        selected: index,
        correct: correctAnswerIndex,
        isCorrect
    });

    if (isCorrect) {
        alert('Benar! Klik OK untuk melanjutkan!');
        score += 10;
    } else {
        alert('Jawaban salah, Klik OK untuk melanjutkan ke pertanyaan berikutnya.');
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        clearInterval(timerInterval);
        showResults();
    }
}

function showResults() {
    let resultText = "Hasil Jawaban:\n";
    results.forEach((result, index) => {
        resultText += `Pertanyaan ${index + 1}: ${result.question}\n`;
        resultText += `Jawaban Anda: ${questions[index].answers[result.selected]} (${result.isCorrect ? "Benar" : "Salah"})\n`;
        resultText += `Jawaban Benar: ${questions[index].answers[result.correct]}\n\n`;
    });
    alert(resultText);
    showScore();
}

function showScore() {
    alert(`Sekormu di level ini ${score}.`);
    localStorage.setItem(`level${currentLevel}Score`, score);

    if (currentLevel === 4 && score >= 50) {
        showCongratulations();
    } else {
        window.location.href = 'level.html';
    }
}

function showCongratulations() {
    const playerName = localStorage.getItem('playerName') || 'Pemain';
    const rewards = ['🎉', '🏆', '🎁', '🎊', '⭐'];
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    alert(`Selamat, ${playerName}! Anda telah menyelesaikan semua level! Hadiah Anda: ${randomReward}`);
    window.location.href = 'level.html';
}

startGame();
