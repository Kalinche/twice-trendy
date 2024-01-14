export function setupProductsGrid(userId) {
    var productsPromise;
    if (userId) {
        productsPromise = fetchUsersProducts(userId);
    } else {
        productsPromise = fetchAllProducts();
    }

    buildGrid(productsPromise);
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

function buildGrid(productsPromise) {
    productsPromise
        .then(body => {
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

                const productImage = document.createElement('img');
                productImage.src = product.images;
                productImage.alt = product.name;

                const productTitle = document.createElement('h3');
                productTitle.textContent = product.name;

                productCard.appendChild(productImage);
                productCard.appendChild(productTitle);

                productsContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Грешка при зареждане на продуктите:', error.message);
            alert('Грешка при зареждане на продуктите: ' + error.message);
        });
}

function redirectToProductDetails(productId) {
    //TODO: Променете URL адреса според структурата на вашето приложение
    window.location.href = '/path-to-product-details/' + productId;
}