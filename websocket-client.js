const WebSocket = require('ws');

// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log('Connected to WebSocket server.');

    // Send a message to request participant data
    ws.send('getParticipants');
});

ws.on('message', (data) => {
    console.log('Received data from server:', JSON.parse(data));
});

ws.on('close', () => {
    console.log('Disconnected from WebSocket server.');
});

ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});