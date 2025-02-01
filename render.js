// Funkcja do wyświetlania użytkowników
function showPlayers() {
    // Wysyłamy zapytanie do backendu po dane użytkowników
    window.electron.getPlayers().then(data => {
        const playersList = document.getElementById('players-list');
        playersList.innerHTML = '';  // Czyścimy listę

        // Iterujemy przez dane i tworzymy elementy <li> do wyświetlenia
        data.forEach(player => {
            const div = document.createElement('div');
            div.textContent = `ID: ${player.id}, Nazwa: ${player.name}, Punkty: ${player.score}`;
            playersList.appendChild(div);
        });
    }).catch(error => {
        console.error('Błąd:', error);
    });
}

// Wywołujemy funkcję po załadowaniu strony
// document.addEventListener('DOMContentLoaded', showPlayers);