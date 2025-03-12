const { app, BrowserWindow, ipcMain } = require('electron');
const mysql = require('mysql2/promise');
const path = require('path');

// Tworzymy okno aplikacji
let win;

const dba = mysql.createConnection({
    host: 'localhost', // Adres hosta (np. '127.0.0.1' lub 'localhost')
    user: 'root',      // Użytkownik MySQL
    password: '',      // Hasło do bazy (pozostaw pusty string, jeśli brak hasła)
    database: '1z10' // Nazwa bazy danych
});

ipcMain.handle('get-players', async () => {
    const connection = await dba;
    try {
        const [rows] = await connection.query('SELECT * FROM players');
        return rows;
    } catch (err) {
        console.error('Błąd podczas pobierania graczy:', err);
        throw err;
    }
});

ipcMain.handle('get-questions', async () => {
    const connection = await dba;
    try {
        const [rows, fields] = await connection.execute('SELECT q.question_number, q.question_text, q.points, a.answer_text FROM questions q JOIN answers a ON q.answer_id = a.id WHERE question_number = 1 AND points = 3;');
        return rows;
    } catch (err) {
        console.error('Błąd podczas pobierania pytań:', err);
        throw err;
    }
});

ipcMain.handle('add-points', async (event, playerId, points) => {
    const connection = await dba;
    try {
        const query = 'UPDATE players SET score = score + ? WHERE id = ?';
        const [result] = await connection.execute(query, [points, playerId]);
        if (result.affectedRows > 0) {
            return true;
        } else {
            throw new Error('Brak gracza o tym ID lub brak zmian.');
        }
    } catch (err) {
        console.error('Błąd przy aktualizacji punktów:', err);
        throw err;
    }
});

ipcMain.handle('subtract-chances', async (event, playerId, points) => {
    const connection = await dba;
    try {
        const query = 'UPDATE players SET chances = chances - ? WHERE id = ?';
        const [result] = await connection.execute(query, [points, playerId]);
        if (result.affectedRows > 0) {
            return true;
        } else {
            throw new Error('Brak gracza o tym ID lub brak zmian.');
        }
    } catch (err) {
        console.error('Błąd przy aktualizacji punktów:', err);
        throw err;
    }
});

ipcMain.handle('reset', async () => {
    const connection = await dba;
    try {
        const query = 'UPDATE players SET score = 0, chances = 3;';
        const [result] = await connection.execute(query);
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Błąd przy resetowaniu danych:', err);
        throw err;
    }
});

ipcMain.handle('update-participant', async (event, { participant, newName, newPoints, newLives }) => {
    const connection = await dba;
    try {
        const query = 'UPDATE players SET name = ?, score = ?, chances = ? WHERE id = ?';
        const [result] = await connection.execute(query, [newName, newPoints, newLives, participant]);
        return { success: result.affectedRows > 0 };
    } catch (err) {
        console.error('Błąd przy aktualizacji uczestnika:', err);
        return { success: false };
    }
});

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});



