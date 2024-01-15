export function setupCreateProductForm() {
    const title = "Създай обява";

    document.getElementById('form-title').textContent = title;
    document.getElementById('form-button').textContent = title;
    var createProductForm = document.getElementById('product-form');
    if (!createProductForm) {
        console.error('Product form not found!');
        return;
    }

    createProductForm.onsubmit = function (e) {
        e.preventDefault();

        var formData = {
            userId: parseInt(localStorage.getItem('userId')),
            name: document.getElementById('name').value,
            imagesUrl: document.getElementById('images').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            size: document.getElementById('size').value,
            color: document.getElementById('color').value,
            brand: document.getElementById('brand').value,
            condition: document.getElementById('condition').value
        };

        console.log(formData);

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
                throw new Error('Проблем при заявката за създаване на продукт: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Успешно създаден продукт:', data);
            alert("Успешно създадден продукт!");
            setTimeout(function () {
                window.location.href = '#/products/user/' + userId;
            }, 500);
        })
        .catch(error => {
            console.error('Грешка при създаване на продукт:', error.message);
        });
}

