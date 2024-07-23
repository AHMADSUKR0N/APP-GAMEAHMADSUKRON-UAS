document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('gameButton').addEventListener('click', function() {
        const playerName = document.getElementById('playerName').value;
        if (playerName) {
            localStorage.setItem('playerName', playerName);
            window.location.replace('level.html');
        } else {
            alert('Silakan masukkan nama pemain.');
        }
    });
});

function startGame() {
    window.location.replace("level.html");
}

function viewProfile() {
    window.location.href = "sosmed.html";
}
