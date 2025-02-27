// Funkcja do wyświetlania użytkowników
function showPlayers() {
    // Wysyłamy zapytanie do backendu po dane użytkowników
    window.electron.getPlayers().then(data => {
        const playersList = document.getElementById('players-list');
        playersList.innerHTML = '';  // Czyścimy listę

        // Iterujemy przez dane i tworzymy elementy do wyświetlenia
        data.forEach(player => {
            const playerContainer = document.createElement('div');
            playerContainer.classList.add('player-container'); // dodanie klasy do kontenera

            // Kontener dla szans, wyświetlanych w jednym rzędzie
            const chancesContainer = document.createElement('div');
            chancesContainer.classList.add('chances-container'); // Dodajemy klasę dla flexboxa
            
            // Tworzymy tyle divów, ile gracz ma żyć
            for (let i = 0; i < player.chances; i++) {
                const chancesDiv = document.createElement('div');
                chancesDiv.classList.add('chances'); // dodanie klasy do każdej szansy
                chancesContainer.appendChild(chancesDiv);  // Dodajemy do kontenera szans
            }

            // Dodajemy kontener szans do głównego kontenera
            playerContainer.appendChild(chancesContainer);

            // Div dla imienia gracza
            const nameDiv = document.createElement('div');
            nameDiv.textContent = player.name;
            nameDiv.classList.add('name'); // dodanie klasy do imienia
            playerContainer.appendChild(nameDiv);  // Dodajemy do kontenera

            // Div dla wyniku gracza
            const idDiv = document.createElement('div');
            idDiv.textContent = player.score;
            idDiv.classList.add('id'); // dodanie klasy do ID
            playerContainer.appendChild(idDiv);  // Dodajemy do kontenera

            // Dodajemy kontener gracza (z szansami, nazwą, i ID) do głównej listy
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

    const buttonWrong = document.getElementById('button-wrong');
    if (buttonWrong) {
        buttonWrong.addEventListener("click", () => {
            console.log("Przycisk został kliknięty!");
            wrongAnwser(1);  // Przekazanie ID gracza (na razie na sztywno)
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

function wrongAnwser(playerId) {
    let pointsNumber = 1;
    window.electron.wrongAnwser(playerId, pointsNumber) // dodajemy punkty
        .then(() => showPlayers()) // odświeżamy listę
        .catch(error => console.error('Błąd', error));
}
