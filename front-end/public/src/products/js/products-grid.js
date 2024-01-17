export function setupProductsGrid(userId, areOrders) {
    const pageTitle = document.querySelector('.title');

    var productsPromise;
    if (userId) {
        if (areOrders) {
            productsPromise = fetchUserOrders(userId);
            pageTitle.textContent = "Моите поръчки";
        } else {
            productsPromise = fetchUserProducts(userId);
            pageTitle.textContent = "Моите обяви";
        }
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
            if (response.status == 204) {
                throw new Error("Няма намерени обяви");
            }
            else if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(body => {
            return body.data;
        })
}

function fetchUserProducts(userId) {
    return fetch(`http://localhost:8080/products/user/${userId}`)
        .then(response => {
            if (response.status == 204) {
                throw new Error("Няма намерени обяви");
            }
            else if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(body => {
            return body.data;
        })
}

function fetchUserOrders(userId) {
    return fetch(`http://localhost:8080/orders/user/${userId}`)
        .then(response => {
            if (response.status == 404) {
                throw new Error("Няма намерени поръчки.");
            } else if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(body => {
            const orders = body.data;
            const productPromises = orders.map(order =>
                fetch(`http://localhost:8080/products/${order.idProduct}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Грешка при зареждане на продукт.");
                        }
                        return response.json();
                    })
                    .then(body => {
                        return body.data
                    })
            );

            return Promise.all(productPromises);
        })
}

function buildGrid(data) {
    if (!Array.isArray(data)) {
        throw new Error("Получените данни не са в правилен формат.");
    }

    const productsContainer = document.querySelector('.products-container');

    data.sort(function (a, b) {
        return a.status.localeCompare(b.status);
    });

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