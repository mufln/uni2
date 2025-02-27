const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Раздача статических файлов (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../frontend")));

// Отдача списка товаров
app.get("/api/products", (req, res) => {
    fs.readFile("products.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка чтения файла" });
        }
        res.json(JSON.parse(data));
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Store server running at http://localhost:${PORT}`);
});

