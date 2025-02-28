const { app, BrowserWindow, ipcMain } = require('electron');
const sqlite3 = require('better-sqlite3');
const mysql = require('mysql2/promise'); 
const path = require('path');

// Tworzymy okno aplikacji
let win;
// MYSQL - POCZĄTEK 

const dba = mysql.createConnection({
    host: 'localhost', // Adres hosta (np. '127.0.0.1' lub 'localhost')
    user: 'root',      // Użytkownik MySQL
    password: '',      // Hasło do bazy (pozostaw pusty string, jeśli brak hasła)
    database: '1z10' // Nazwa bazy danych
  });


/*
// Tworzenie puli połączeń do MySQL
const pool = mysql.createPool({
    host: 'localhost',   // Adres serwera MySQL
    user: 'root',        // Domyślny użytkownik XAMPP
    password: '',        // Domyślnie w XAMPP brak hasła
    database: 'jedenzdziesieciu', // Zmień na swoją bazę danych
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Funkcja do pobierania danych graczy - MySQL
async function getPlayers() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM players');
        return rows;
    } finally {
        connection.release(); // Zwolnienie połączenia
    }
}

// Obsługa IPC dla pobierania graczy - MySQL
ipcMain.handle('get-players', async () => {
    return await getPlayers();
});
// MYSQL - KONIEC
*/

ipcMain.handle('get-players', async () => {
    // Tworzymy połączenie z bazą danych MySQL
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',           // Zmień na swoją nazwę użytkownika
        password: '',   // Zmień na swoje hasło
        database: '1z10'  // Nazwa bazy danych
    });

    try {
        // Wykonujemy zapytanie SELECT, aby pobrać wszystkich graczy
        const [rows, fields] = await connection.execute('SELECT * FROM players');

        // Zwracamy dane graczy
        return rows;
    } catch (err) {
        console.error('Błąd podczas pobierania graczy:', err);
        throw err;
    } finally {
        // Zamykanie połączenia
        await connection.end();
    }
});


// Aktualizacja punktów
ipcMain.handle('add-points', async (event, playerId, points) => {
    // Tworzymy połączenie z bazą danych MySQL
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',           // Zmień na swoją nazwę użytkownika
        password: '',   // Zmień na swoje hasło
        database: '1z10'  // Nazwa bazy danych
    });

    try {
        const query = 'UPDATE players SET score = score + ? WHERE id = ?';
        
        // Wykonujemy zapytanie UPDATE
        const [result] = await connection.execute(query, [points, playerId]);

        if (result.affectedRows > 0) {
            return true;  // Jeśli zmieniono rekordy, zwracamy sukces
        } else {
            throw new Error('Brak gracza o tym ID lub brak zmian.');
        }
    } catch (err) {
        console.error('Błąd przy aktualizacji punktów:', err);
        throw err;  // Zwracamy błąd
    } finally {
        // Zamykanie połączenia
        await connection.end();
    }
});

ipcMain.handle('subtract-chances', async (event, playerId, points) => {
    // Tworzymy połączenie z bazą danych MySQL
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',           // Zmień na swoją nazwę użytkownika
        password: '',   // Zmień na swoje hasło
        database: '1z10'  // Nazwa bazy danych
    });
    try {
        const query = 'UPDATE players SET chances = chances - ? WHERE id = ?';
        
        // Wykonujemy zapytanie UPDATE
        const [result] = await connection.execute(query, [points, playerId]);

        if (result.affectedRows > 0) {
            return true;  // Jeśli zmieniono rekordy, zwracamy sukces
        } else {
            throw new Error('Brak gracza o tym ID lub brak zmian.');
        }
    } catch (err) {
        console.error('Błąd przy aktualizacji punktów:', err);
        throw err;  // Zwracamy błąd
    } finally {
        // Zamykanie połączenia
        await connection.end();
    }
});


function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,  // Pozwala na używanie Node.js w frontendzie
            preload: path.join(__dirname, 'preload.js')  // Plik preload (używany do komunikacji z frontendem)
        }
    });

    win.loadFile('index.html');  // Ładujemy nasz frontend (HTML)
}


// Kiedy aplikacja jest gotowa
app.whenReady().then(createWindow);

// Obsługa zamykania aplikacji
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});



