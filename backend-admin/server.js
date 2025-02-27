const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 8080;

app.use(express.json());

// Чтение товаров
const readProducts = () => {
    const data = fs.readFileSync("../backend-store/products.json", "utf8");
    return JSON.parse(data);
};

// Запись товаров
const writeProducts = (products) => {
    fs.writeFileSync("../backend-store/products.json", JSON.stringify(products, null, 2));
};

app.get("/api/products", (req, res) => {
    try {
        const products = readProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Ошибка чтения товаров" });
    }
});

// Добавление товара
app.post("/api/products", (req, res) => {
    const products = readProducts();
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

// Редактирование товара
app.put("/api/products/:id", (req, res) => {
    const products = readProducts();
    const index = products.findIndex(p => p.id == req.params.id);

    if (index === -1) return res.status(404).json({ error: "Товар не найден" });

    products[index] = { ...products[index], ...req.body };
    writeProducts(products);
    res.json(products[index]);
});

// Удаление товара
app.delete("/api/products/:id", (req, res) => {
    let products = readProducts();
    products = products.filter(p => p.id != req.params.id);
    writeProducts(products);
    res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Admin server running at http://localhost:${PORT}`);
});
