document.addEventListener('DOMContentLoaded', function() {
    function checkLevelAccess() {
        const level1Score = parseInt(localStorage.getItem('level1Score')) || 0;
        const level2Score = parseInt(localStorage.getItem('level2Score')) || 0;
        const level3Score = parseInt(localStorage.getItem('level3Score')) || 0;
        const level4Score = parseInt(localStorage.getItem('level4Score')) || 0;

        if (level1Score < 50) {
            lockLevel('level2', 'Anda harus memperoleh skor minimal 50 di Level 1 untuk membuka Level 2.');
        }

        if (level2Score < 50) {
            lockLevel('level3', 'Anda harus memperoleh skor minimal 50 di Level 2 untuk membuka Level 3.');
        }

        if (level3Score < 80) {
            lockLevel('level4', 'Anda harus memperoleh skor minimal 50 di Level 3 untuk membuka Level 4.');
        }
    }

    function lockLevel(levelId, message) {
        const levelElement = document.getElementById(levelId);
        levelElement.classList.add('locked');
        levelElement.addEventListener('click', function(event) {
            event.preventDefault();
            alert(message);
        });
    }

    function resetLevels() {
        localStorage.removeItem('level1Score');
        localStorage.removeItem('level2Score');
        localStorage.removeItem('level3Score');
        localStorage.removeItem('level4Score');
        alert('Semua level telah direset.');
        window.location.reload();
    }

    document.getElementById('tombol-reset').addEventListener('click', resetLevels);

    checkLevelAccess();
});
document.getElementById('tombol-menu').addEventListener('click', function() {
    window.location.href = 'frontpage.html';
});




