document.addEventListener("DOMContentLoaded", () => {
    const query = `
    query {
      products {
        id
        name
        price
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
            const products = result.data.products;
            const catalog = document.getElementById("catalog");
            products.forEach(product => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `
        <h3>${product.name}</h3>
        <strong>${product.price} руб.</strong>
      `;
                catalog.appendChild(card);
            });
        })
        .catch(error => console.error("Ошибка GraphQL-запроса:", error));
});
