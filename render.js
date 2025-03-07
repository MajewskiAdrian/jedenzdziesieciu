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
            
            // Tworzymy tyle divów, ile gracz ma szans
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

            const playerRadio = document.createElement('input');
            playerRadio.type = 'radio';
            playerRadio.name = 'playerSelection'; // Grupa radio buttonów
            playerRadio.value = player.id; // Przypisanie ID gracza
            playerRadio.classList.add('player-radio');
            playerContainer.appendChild(playerRadio);

            // Dodajemy zdarzenie kliknięcia na player-container
            playerContainer.addEventListener('click', () => {
                // Odznaczamy wszystkie inne radiobuttony
                const allRadios = document.querySelectorAll('input[name="playerSelection"]');
                allRadios.forEach(radio => {
                    radio.checked = false;  // Odznaczamy inne radio
                });

                // Zaznaczamy bieżący radiobutton
                playerRadio.checked = true;

                // Dodajemy lub usuwamy klasę .selected
                const allContainers = document.querySelectorAll('.player-container');
                allContainers.forEach(container => {
                    container.classList.remove('selected');  // Usuwamy klasę z innych kontenerów
                });

                // Dodajemy klasę .selected do klikniętego kontenera
                playerContainer.classList.add('selected');
            });

            // Dodajemy kontener gracza (z szansami, nazwą, ID i przyciskiem) do głównej listy
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
            const selectedPlayer = document.querySelector('input[name="playerSelection"]:checked');
            if (selectedPlayer) {
                correctAnwser(selectedPlayer.value);  // Przekazanie ID gracza
            } else {
                console.log("Wybierz uczestnika!")
            }
            
        });
    }

    const buttonWrong = document.getElementById('button-wrong');
    if (buttonWrong) {
        buttonWrong.addEventListener("click", () => {
            const selectedPlayer = document.querySelector('input[name="playerSelection"]:checked');
            if (selectedPlayer) {
                wrongAnwser(selectedPlayer.value);  // Przekazanie ID gracza
            } else {
                console.log("Wybierz uczestnika!")
            }
        });
    }

    const buttonReset = document.getElementById('button-reset');
    if (buttonReset) {
        buttonReset.addEventListener("click", () => {
            console.log("Reset");
            reset();
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

function reset() {
    window.electron.reset() 
        .then(() => showPlayers())
        .catch(error => console.error('Błąd', error));
}
