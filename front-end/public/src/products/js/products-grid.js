document.addEventListener('DOMContentLoaded', function () {
    fetch('https://localhost:8080/products/')
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.querySelector('.products-container');
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                const productImage = document.createElement('img');
                productImage.src = product.imageUrl;
                productImage.alt = product.name;

                const productTitle = document.createElement('h3');
                productTitle.textContent = product.name;

                productCard.appendChild(productImage);
                productCard.appendChild(productTitle);

                productsContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Грешка при зареждане на обявите:', error);
        });
});

function redirectToproductDetails(productId) {
    //TODO: Променете URL адреса според структурата на вашето приложение
    window.location.href = '/path-to-product-details/' + productId;
}