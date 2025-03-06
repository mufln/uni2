const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5001 }, () => {
    console.log('WebSocket сервер запущен на порту 5000');
});

wss.on('connection', (ws) => {
    console.log('Новое подключение к чату');

    ws.on('message', (message) => {
        console.log(`Получено сообщение: ${message}`);
        // Отправляем сообщение всем подключённым клиентам, включая отправителя
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Клиент отключился');
    });
});
