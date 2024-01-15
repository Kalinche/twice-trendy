export function setupProductsGrid(userId) {
    const pageTitle = document.querySelector('.title');

    var productsPromise;
    if (userId) {
        productsPromise = fetchUsersProducts(userId);
        pageTitle.textContent = "Моите обяви";
    } else {
        productsPromise = fetchAllProducts();
        pageTitle.textContent = "Всички обяви";
    }

    productsPromise
        .then(data => {
            buildGrid(data);
        })
        .catch(error => {
            console.error('Грешка при зареждане на продуктите:', error.message);
            alert('Грешка при зареждане на продуктите: ' + error.message);
        });
};

function fetchAllProducts() {
    return fetch('http://localhost:8080/products')
        .then(response => {
            if (response.status == 404) {
                throw new Error("Няма намерени продукти.");
            }
            else if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
}

function fetchUsersProducts(userId) {
    return fetch(`http://localhost:8080/products/user/${userId}`)
        .then(response => {
            if (response.status == 404) {
                throw new Error("Няма намерени продукти.");
            }
            else if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
}

function buildGrid(body) {
    const data = body.data;
    if (!Array.isArray(data)) {
        console.log(data);
        throw new Error("Получените данни не са в правилен формат.");
    }

    const productsContainer = document.querySelector('.products-container');
    data.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = () => redirectToProductDetails(product.id);

        if (product.status == "Sold") {
            productCard.setAttribute('class', 'product-card sold');
        }

        const productImage = document.createElement('img');
        productImage.src = product.images;
        productImage.alt = product.name;

        const productTitle = document.createElement('h3');
        productTitle.textContent = product.name;

        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);

        productsContainer.appendChild(productCard);
    });

}

function redirectToProductDetails(productId) {
    window.location.href = '#/products/' + productId;
}