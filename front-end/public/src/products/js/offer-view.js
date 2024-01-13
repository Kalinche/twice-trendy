document.addEventListener('DOMContentLoaded', function () {
    var productId = getProductsIdFromURL();

    //TODO: change
    fetch('https://localhost:8080/products/' + productId)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            populateProductDetails(data);
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
});

function populateProductDetails(data) {
    document.querySelector('.product-details h1').textContent = data.name;

    var imagesContainer = document.querySelector('.product-images');
    data.images.forEach(imgUrl => {
        var img = document.createElement('img');
        img.src = imgUrl;
        imagesContainer.appendChild(img);
    });

    details = document.querySelector('.product-datails')
    details.innerHTML += '<p><strong>Автор:</strong> ' + data.author + '</p>';
    details.innerHTML += '<p><strong>Описание:</strong> ' + data.description + '</p>';
    details.innerHTML += '<p><strong>Цена:</strong> ' + data.price + '</p>';
    details.innerHTML += '<p><strong>Размер:</strong> ' + (data.size || 'N/A') + '</p>';
    details.innerHTML += '<p><strong>Цвят:</strong> ' + (data.color || 'N/A') + '</p>';
    details.innerHTML += '<p><strong>Марка:</strong> ' + (data.brand || 'N/A') + '</p>';
    details.innerHTML += '<p><strong>Състояние на дрехата:</strong> ' + (data.condition || 'N/A') + '</p>';
    details.innerHTML += '<p><strong>Статус на обявата:</strong> ' + data.status + '</p>';
    details.innerHTML += '<p><strong>Купувач:</strong> ' + (data.buyer || 'Няма') + '</p>';
}


function getProductIdFromURL() {
    //TODO: get product id
    // Имплементирайте логика за извличане на ID на обявата от URL параметъра или друг метод
    return 'some-product-id'; // Примерен идентификатор
}
