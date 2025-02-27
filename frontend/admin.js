const API_URL = "http://localhost:8080/api/products";

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    document.getElementById("addProductForm").addEventListener("submit", addProduct);
});

// Загрузка списка товаров
function loadProducts() {
    fetch(API_URL)
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("productList");
            productList.innerHTML = ""; // Очистка перед обновлением

            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.className = "product-card";
                productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <strong>${product.price} руб.</strong>
                    <button onclick="editProduct(${product.id})">✏️ Редактировать</button>
                    <button onclick="deleteProduct(${product.id})">🗑️ Удалить</button>
                `;
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error("Ошибка загрузки:", error));
}

// Добавление товара
function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, description })
    })
    .then(response => response.json())
    .then(() => {
        loadProducts(); // Обновление списка
        document.getElementById("addProductForm").reset();
    })
    .catch(error => console.error("Ошибка добавления:", error));
}

// Удаление товара
function deleteProduct(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => loadProducts())
    .catch(error => console.error("Ошибка удаления:", error));
}

// Редактирование товара (запрашивает новое название, цену и описание)
function editProduct(id) {
    const name = prompt("Введите новое название:");
    const price = prompt("Введите новую цену:");
    const description = prompt("Введите новое описание:");

    if (name && price && description) {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, description })
        })
        .then(() => loadProducts())
        .catch(error => console.error("Ошибка редактирования:", error));
    }
}

