document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('button-edit');
    if (!editButton) {
        console.error('Przycisk button-edit nie został znaleziony!');
    } else {
        console.log('Przycisk button-edit został znaleziony!');
        editButton.addEventListener('click', openModal);
    }
});

async function openModal() {
    console.log('openModal() działa!');
    const modal = document.getElementById('edit-modal');
    const response = await fetch('editModal.html');
    if (!response.ok) {
        console.error('Nie udało się pobrać editModal.html:', response.statusText);
        return;
    }
    modal.innerHTML = await response.text();
    modal.style.display = 'block';

    // Fetch participants from the server
    const participantsResponse = await window.electron.getPlayers();
    const participantSelect = document.getElementById('participant-select');
    participantSelect.innerHTML = participantsResponse.map(participant => 
        `<option value="${participant.id}">${participant.name}</option>`
    ).join('');

    // Store participants data in a data attribute
    participantSelect.dataset.participants = JSON.stringify(participantsResponse);

    // Clear input fields
    document.getElementById('edit-name').value = '';
    document.getElementById('edit-points').value = '';
    document.getElementById('edit-lives').value = '';

    // Add event listener to update input fields when a participant is selected
    participantSelect.addEventListener('change', updateParticipantFields);

    // Trigger change event to populate fields for the initially selected participant
    participantSelect.dispatchEvent(new Event('change'));
}

function updateParticipantFields() {
    const participantSelect = document.getElementById('participant-select');
    const participantsResponse = JSON.parse(participantSelect.dataset.participants);
    const selectedParticipant = participantsResponse.find(p => p.id == participantSelect.value);

    const nameInput = document.getElementById('edit-name');
    const pointsInput = document.getElementById('edit-points');
    const livesInput = document.getElementById('edit-lives');

    // Usuwamy i ponownie tworzymy pole tekstowe, żeby się "odmroziło"
    const newNameInput = nameInput.cloneNode(true);
    nameInput.parentNode.replaceChild(newNameInput, nameInput);

    // Uzupełniamy nowo stworzone pole danymi
    newNameInput.value = selectedParticipant.name;
    pointsInput.value = selectedParticipant.score;
    livesInput.value = selectedParticipant.chances;

    // Ustawiamy fokus na nowym polu
    newNameInput.focus();
}



function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
    const participantSelect = document.getElementById('participant-select');
    participantSelect.removeEventListener('change', updateParticipantFields);
}

async function saveChanges() {
    const participant = document.getElementById('participant-select').value;
    const newName = document.getElementById('edit-name').value;
    const newPoints = document.getElementById('edit-points').value;
    const newLives = document.getElementById('edit-lives').value;

    if (newLives > 3) {
        alert('Maksymalna liczba żyć to 3.');
        return;
    }

    if (newLives < 0) {
        alert('Liczba żyć nie może być ujemna.');
        return;
    }

    const response = await window.electron.updateParticipant({ participant, newName, newPoints, newLives });

    if (response.success) {
        alert('Dane zaktualizowane!');
        closeModal();
        location.reload();
    } else {
        alert('Błąd aktualizacji');
    }
}