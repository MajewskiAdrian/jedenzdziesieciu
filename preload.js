const { contextBridge, ipcRenderer } = require('electron');

// Umożliwiamy dostęp do funkcji IPC z procesu głównego
contextBridge.exposeInMainWorld('electron', {
    getPlayers: () => ipcRenderer.invoke('get-players'),
    getQuestions: (questionNumber, questionPoints) => ipcRenderer.invoke('get-questions', questionNumber, questionPoints),
    correctAnwser: (playerId, points) => ipcRenderer.invoke('add-points', playerId, points),
    wrongAnwser: (playerId, points) => ipcRenderer.invoke('subtract-chances', playerId, points),
    reset: () => ipcRenderer.invoke('reset'),
    updateParticipant: (data) => ipcRenderer.invoke('update-participant', data),
    importXML: () => ipcRenderer.invoke('import-xml')
});
    