// Funkcja do wyświetlania użytkowników
function showPlayers() {
    // Wysyłamy zapytanie do backendu po dane użytkowników
    window.electron.getPlayers().then(data => {
        const playersList = document.getElementById('players-list');
        playersList.innerHTML = '';  // Czyścimy listę

        // Iterujemy przez dane i tworzymy elementy <li> do wyświetlenia
        data.forEach(player => {
            const playerContainer = document.createElement('div');
            playerContainer.classList.add('player-container'); // dodanie do klasy

            const chancesDiv = document.createElement('div');
            chancesDiv.textContent = player.chances;
            chancesDiv.classList.add('chances'); // dodanie klasy

            const nameDiv = document.createElement('div');
            nameDiv.textContent = player.name;
            nameDiv.classList.add('name');

            const idDiv = document.createElement('div');
            idDiv.textContent = player.score;
            idDiv.classList.add('id');

            // Dodajemy te elementy do kontenera gracza
            playerContainer.appendChild(chancesDiv);
            playerContainer.appendChild(nameDiv);
            playerContainer.appendChild(idDiv);

            // Dodajemy kontener gracza do głównej listy
            playersList.appendChild(playerContainer);
        });
    }).catch(error => {
        console.error('Błąd:', error);
    });
}

// Wywołujemy funkcję po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    showPlayers(); // Wczytanie graczy

    // Obsługa przycisku - demo!!!
    const buttonCorrect = document.getElementById('button-correct');
    if (buttonCorrect) {
        buttonCorrect.addEventListener("click", () => {
            console.log("Przycisk został kliknięty!");
            correctAnwser(1);  // Przekazanie ID gracza (na razie na sztywno)
        });
    }
});


// Funkcja po poprawnej odpowiedzi
function correctAnwser(playerId) {
    let pointsNumber = 10;
    window.electron.correctAnwser(playerId, pointsNumber) // dodajemy punkty
        .then(() => showPlayers()) // odświeżamy listę
        .catch(error => console.error('Błąd', error));

}