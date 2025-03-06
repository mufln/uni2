const ws = new WebSocket("ws://localhost:5001");

ws.onopen = () => {
    console.log("Подключение к серверу чата установлено");
};

ws.onmessage = async (event) => {
    let messageText;
    // Если полученные данные – Blob, преобразуем в текст
    if (event.data instanceof Blob) {
        messageText = await event.data.text();
    } else {
        messageText = event.data;
    }
    const chatWindow = document.getElementById("chatWindow");
    const messageElem = document.createElement("div");
    messageElem.textContent = messageText;
    chatWindow.appendChild(messageElem);
};

document.getElementById("sendMessage").addEventListener("click", () => {
    const input = document.getElementById("chatMessage");
    if (input.value.trim()) {
        ws.send(input.value.trim());
        input.value = "";
    }
});
