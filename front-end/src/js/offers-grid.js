document.addEventListener('DOMContentLoaded', function () {
    fetch('path/to/your/server/endpoint') //TODO: Заменете с реалния URL към сървъра
        .then(response => response.json())
        .then(data => {
            const offersContainer = document.querySelector('.offers-container');
            data.forEach(offer => {
                const offerCard = document.createElement('div');
                offerCard.className = 'offer-card';

                const offerImage = document.createElement('img');
                offerImage.src = offer.imageUrl;
                offerImage.alt = offer.name;

                const offerTitle = document.createElement('h3');
                offerTitle.textContent = offer.name;

                offerCard.appendChild(offerImage);
                offerCard.appendChild(offerTitle);

                offersContainer.appendChild(offerCard);
            });
        })
        .catch(error => {
            console.error('Грешка при зареждане на обявите:', error);
            // Тук може да добавите обработка на грешки
        });
});
