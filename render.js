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
            if (player.chances < 1) {
                playerContainer.classList.add('eliminated');
            }

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
            const questionTextDiv = document.createElement('div');
            questionTextDiv.textContent = player.score;
            questionTextDiv.classList.add('id'); // dodanie klasy do ID
            playerContainer.appendChild(questionTextDiv);  // Dodajemy do kontenera

            const playerRadio = document.createElement('input');
            playerRadio.type = 'radio';
            playerRadio.name = 'playerSelection'; // Grupa radio buttonów
            playerRadio.value = player.id; // Przypisanie ID gracza
            playerRadio.classList.add('player-radio');
            playerContainer.appendChild(playerRadio);

            // Dodajemy zdarzenie kliknięcia na player-container
            playerContainer.addEventListener('click', () => {
                if (player.chances > 0) {
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
                }

            });

            // Dodajemy kontener gracza (z szansami, nazwą, ID i przyciskiem) do głównej listy
            playersList.appendChild(playerContainer);
        });
    }).catch(error => {
        console.error('Błąd:', error);
    });
}

let currentQuestionNumber = 1;
let questionPoints = 3;

// Funkcja wyświetlająca pytania
function showQuestions() {
    // Wysyłamy zapytanie do backendu po dane pytań
    console.log("Numer pytania w showQuestions: ", currentQuestionNumber, questionPoints)
    window.electron.getQuestions(currentQuestionNumber, questionPoints).then(data => {

        // Sprawdzamy, czy dane nie są puste
        if (!data || data.length === 0) {
            if (questionPoints == 1)
                questionPoints += 1;
            console.error('Brak danych lub błąd w odpowiedzi');
            return;  // Zatrzymujemy funkcję, nie odświeżamy tabeli
        }

        // Pobieramy element <tbody> dla tabeli
        const questionBody = document.getElementById('question-body');
        questionBody.innerHTML = '';  // Czyścimy listę pytań

        // Iterujemy przez dane i tworzymy wiersze tabeli
        data.forEach(question => {
            console.log("Dodaję pytanie:", question); // Debugowanie

            currentQuestionNumber = question.question_number;

            const questionRow = document.createElement('tr');

            // Komórka dla numeru pytania
            const questionNumberTd = document.createElement('td');
            questionNumberTd.textContent = question.question_number;
            questionRow.appendChild(questionNumberTd);

            // Komórka dla treści pytania
            const questionTextTd = document.createElement('td');
            questionTextTd.textContent = question.question_text;
            questionRow.appendChild(questionTextTd);

            // Komórka dla ilości punktów
            const questionPointsTd = document.createElement('td');
            questionPointsTd.textContent = question.points;
            questionRow.appendChild(questionPointsTd);

            // Komórka dla odpowiedzi
            const questionAnswerTd = document.createElement('td');
            questionAnswerTd.textContent = question.answer_text;
            questionRow.appendChild(questionAnswerTd);

            // Dodajemy wiersz do tabeli
            questionBody.appendChild(questionRow);
        });
    }).catch(error => {
        console.error('Błąd:', error);
    });
}

// Wywołujemy funkcję po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    showPlayers(); // Wczytanie graczy
    showQuestions(); // Wczytanie pytań

    const buttonCorrect = document.getElementById('button-correct');
    if (buttonCorrect) {
        buttonCorrect.addEventListener("click", () => {
            const selectedPlayer = document.querySelector('input[name="playerSelection"]:checked');
            //const questionNumber = questionNumberTd.value
            if (selectedPlayer) {
                correctAnwser(selectedPlayer.value, questionPoints);  // Przekazanie ID gracza
                nextQuestion();
                console.log("Numer pytania: ", currentQuestionNumber)
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
                nextQuestion();
            } else {
                console.log("Wybierz uczestnika!")
            }
        });
    }

    const buttonNextQuestion = document.getElementById('button-next-question');
    if (buttonNextQuestion) {
        buttonNextQuestion.addEventListener("click", () => {
            nextQuestion();
        });
    }

    const buttonPreviousQuestion = document.getElementById('button-previous-question');
    if (buttonPreviousQuestion) {
        buttonPreviousQuestion.addEventListener("click", () => {
            previousQuestion();
        });
    }

    const buttonEasierQuestion = document.getElementById('button-easier-question');
    if (buttonEasierQuestion) {
        buttonEasierQuestion.addEventListener("click", () => {
            easierQuestion();
        });
    }

    const buttonHarderQuestion = document.getElementById('button-harder-question');
    if (buttonHarderQuestion) {
        buttonHarderQuestion.addEventListener("click", () => {
            harderQuestion();
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
    let pointsNumber = questionPoints;
    window.electron.correctAnwser(playerId, pointsNumber) // dodajemy punkty
        .then(() => showPlayers()) // odświeżamy listę uczestników
        .then(() => showQuestions()) // odświeżamy pytanie
        .catch(error => console.error('Błąd', error));
}

function wrongAnwser(playerId) {
    window.electron.wrongAnwser(playerId, 1) // odejmujemy szanse
        .then(() => showPlayers()) // odświeżamy listę
        .then(() => showQuestions()) // odświeżamy pytanie
        .catch(error => console.error('Błąd', error));
}

function nextQuestion() {
    currentQuestionNumber += 1;
    console.log("Numer pytania w nextQuestion: ", currentQuestionNumber)
    questionPoints = 3;
    showQuestions()
}

function previousQuestion() {
    if (currentQuestionNumber > 1) {
        currentQuestionNumber -= 1;
        console.log("Numer pytania: ", currentQuestionNumber)
    }
    else {
        console.log("Jesteś na pierwszym pytaniu")
    }

    questionPoints = 3;
    showQuestions()
}

function easierQuestion() {
    if (questionPoints > 1) {
        questionPoints -= 1;
        console.log("Wartość pytania w easierQuestion: ", questionPoints)
    }
    else {
        console.log("Nie ma łatwiejszych pytań");
    }

    showQuestions()
}

function harderQuestion() {
    if (questionPoints < 3) {
        questionPoints += 1;
        console.log("Wartość pytania w easierQuestion: ", questionPoints)
    }
    else {
        console.log("Nie ma trudniejszych pytań");
    }

    showQuestions()
}


function reset() {
    currentQuestionNumber = 1;
    window.electron.reset()
        .then(() => showPlayers())
        .then(() => showQuestions()) // odświeżamy pytanie
        .catch(error => console.error('Błąd', error));
}



document.addEventListener("DOMContentLoaded", () => {
    console.log("🌍 DOM załadowany!");

    const importButton = document.getElementById("importButton");

    if (!importButton) {
        console.error("Nie znaleziono guzika o ID 'importButton'!");
        return;
    }

    console.log("✅ Znaleziono guzik!");

    importButton.addEventListener("click", async () => {
        console.log(" Kliknięto guzik!");

        const result = await window.electron.importXML();

        console.log("Wynik importu:", result);

        alert(result.message);
    });
});
