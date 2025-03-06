document.addEventListener("DOMContentLoaded", () => {
    // Возможные значения фильтра: "full", "price", "description"
    let currentFilter = "full";
    let productsData = [];

    // Назначаем обработчики для кнопок фильтров
    document.getElementById("filter-full").addEventListener("click", () => {
        currentFilter = "full";
        renderProducts();
    });
    document.getElementById("filter-price").addEventListener("click", () => {
        currentFilter = "price";
        renderProducts();
    });
    document.getElementById("filter-description").addEventListener("click", () => {
        currentFilter = "description";
        renderProducts();
    });

    // GraphQL-запрос для получения товаров
    const query = `
    query {
      products {
        id
        name
        price
        description
      }
    }
  `;

    fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    })
        .then(response => response.json())
        .then(result => {
            productsData = result.data.products;
            renderProducts();
        })
        .catch(error => console.error("Ошибка GraphQL-запроса:", error));

    // Функция для отрисовки карточек товаров согласно выбранному фильтру
    function renderProducts() {
        const catalog = document.getElementById("catalog");
        catalog.innerHTML = "";

        productsData.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            if (currentFilter === "full") {
                card.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <strong>${product.price} руб.</strong>
        `;
            } else if (currentFilter === "price") {
                card.innerHTML = `
          <h3>${product.name}</h3>
          <strong>${product.price} руб.</strong>
        `;
            } else if (currentFilter === "description") {
                card.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        `;
            }

            catalog.appendChild(card);
        });
    }
});
