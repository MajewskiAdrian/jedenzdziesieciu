const { contextBridge, ipcRenderer } = require('electron');

// Umożliwiamy dostęp do funkcji IPC z procesu głównego
contextBridge.exposeInMainWorld('electron', {
    getPlayers: () => ipcRenderer.invoke('get-players'),
    addPoints: (playerId, points) => ipcRenderer.invoke('add-points', playerId, points)
});
