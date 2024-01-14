export function setupCreateProductForm() {
    var createProductForm = document.getElementById('create-product-form');
    if (!createProductForm) {
        console.error('CreateProductForm not found!');
        return;
    }

    createProductForm.onsubmit = function (e) {
        e.preventDefault();

        var formData = {
            userId: localStorage.getItem('userID'),
            name: document.getElementById('name').value,
            images: document.getElementById('images').value.split(',').map(url => url.trim()),
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            size: document.getElementById('size').value,
            color: document.getElementById('color').value,
            brand: document.getElementById('brand').value,
            condition: document.getElementById('condition').value
        };

        submitProduct(formData);
    };
};

function submitProduct(formData) {
    var createProductUrl = 'http://localhost:8080/products';

    fetch(createProductUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Проблем при заявката за създаване на обява: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Успешно създадена обява:', data);
        })
        .catch(error => {
            console.error('Грешка при създаване на обява:', error.message);
        });
}

