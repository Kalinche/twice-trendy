document.addEventListener('DOMContentLoaded', function () {
    var offerId = getOfferIdFromURL();

    //TODO: change
    fetch('https://localhost:8080/offers/' + offerId)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            populateOfferDetails(data);
        })
        .catch(error => {
            console.error('Error fetching offer details:', error);
        });
});

function populateOfferDetails(data) {
    document.querySelector('.offer-details h1').textContent = data.name;

    var imagesContainer = document.querySelector('.offer-images');
    data.images.forEach(imgUrl => {
        var img = document.createElement('img');
        img.src = imgUrl;
        imagesContainer.appendChild(img);
    });

    details = document.querySelector('.offer-datails')
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


function getOfferIdFromURL() {
    //TODO: get offer id
    // Имплементирайте логика за извличане на ID на обявата от URL параметъра или друг метод
    return 'some-offer-id'; // Примерен идентификатор
}
