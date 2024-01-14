export function setupProductView(productId) {
    fetch('http://localhost:8080/products/' + productId)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(body => {
            console.log(body);
            // fetchUsername(body.data.)
            populateProductDetails(body.data);
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
};

function populateProductDetails(data) {
    document.querySelector('.product-container h1').textContent = data.name;

    var imagesContainer = document.querySelector('.product-images');
    var img = document.createElement('img');
    img.src = data.images;
    imagesContainer.appendChild(img);

    var details = document.querySelector('.product-characteristics');

    function createDetailElement(label, value) {
        var strong = document.createElement('strong');
        strong.textContent = label;

        var p = document.createElement('p');
        p.appendChild(strong);
        p.appendChild(document.createTextNode(value || 'N/A'));

        return p;
    }

    details.appendChild(createDetailElement('Автор: ', data.author));
    details.appendChild(createDetailElement('Описание: ', data.description));
    details.appendChild(createDetailElement('Цена: ', data.price, "лв."));
    details.appendChild(createDetailElement('Размер: ', data.size));
    details.appendChild(createDetailElement('Цвят: ', data.color));
    details.appendChild(createDetailElement('Марка: ', data.brand));
    details.appendChild(createDetailElement('Състояние на дрехата: ', data.condition));
    details.appendChild(createDetailElement('Статус на обявата: ', data.status));
}
