const { app, BrowserWindow, ipcMain, dialog } = require('electron');
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

ipcMain.handle('get-questions', async (event, questionNumber, questionPoints) => {
    const connection = await dba;
    console.log("Wartość przed SQL: ", questionPoints)
    try {
        const [rows] = await connection.execute(
            'SELECT q.question_number, q.question_text, q.points, a.answer_text FROM questions q JOIN answers a ON q.answer_id = a.id WHERE question_number = ? AND points = ?;',
            [questionNumber, questionPoints],
        );
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




ipcMain.handle('import-xml', async () => {
    const { filePaths } = await dialog.showOpenDialog({
        filters: [{ name: 'XML Files', extensions: ['xml'] }],
        properties: ['openFile']
    });

    if (filePaths.length === 0) return { success: false, message: "Nie wybrano pliku!" };

    const fileContent = fs.readFileSync(filePaths[0], 'utf-8');
    const parser = new xml2js.Parser();

    try {
        const data = await parser.parseStringPromise(fileContent);

        if (!data.questions || !data.questions.question) {
            throw new Error("Niepoprawna struktura XML!");
        }

        const questions = data.questions.question;
        const connection = await dba;

        await connection.beginTransaction();

        for (const q of questions) {
            const questionText = q.text[0];
            const category = q.category ? q.category[0] : "Inne";

            console.log(`Dodaję pytanie: ${questionText}, kategoria: ${category}`);

            const [questionResult] = await connection.execute(
                "INSERT INTO questions (question_text, category) VALUES (?, ?)", 
                [questionText, category]
            );

            const questionId = questionResult.insertId;

            for (const a of q.answers[0].answer) {
                const answerText = a._;
                const isCorrect = a.$.correct === "true" ? 1 : 0;

                console.log(`Dodaję odpowiedź: ${answerText}, poprawna: ${isCorrect}`);

                await connection.execute(
                    "INSERT INTO answers (question_id, answer_text, is_correct) VALUES (?, ?, ?)", 
                    [questionId, answerText, isCorrect]
                );
            }
        }

        await connection.commit();
        console.log("Import zakończony sukcesem!");

        return { success: true, message: "Import zakończony sukcesem!" };

    } catch (err) {
        console.error("Błąd importu XML:", err);
        const connection = await dba;
        await connection.rollback();
        return { success: false, message: "Błąd importu XML!" };
    }
});
