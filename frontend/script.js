document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/products")
        .then(response => response.json())
        .then(products => {
            const catalog = document.getElementById("catalog");
            products.forEach(product => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <strong>${product.price} руб.</strong>
                `;
                catalog.appendChild(card);
            });
        })
        .catch(error => console.error("Ошибка загрузки товаров:", error));
});

