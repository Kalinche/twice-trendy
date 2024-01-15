export function setupUpdateProductForm(productId) {
    const title = "Редактирай обява №" + productId;

    document.getElementById('form-title').textContent = title;
    document.getElementById('form-button').textContent = title;
    var updateProductForm = document.getElementById('product-form');
    if (!updateProductForm) {
        console.error('Product form not found!');
        return;
    }

    populateForm(productId);

    updateProductForm.onsubmit = function (e) {
        e.preventDefault();

        var formData = {
            userId: parseInt(localStorage.getItem('userId')),
            name: document.getElementById('name').value,
            images: document.getElementById('images').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            size: document.getElementById('size').value,
            color: document.getElementById('color').value,
            brand: document.getElementById('brand').value,
            condition: document.getElementById('condition').value
        };

        console.log(formData);

        submitProduct(productId, formData);
    };
};

function populateForm(productId) {
    fetch('http://localhost:8080/products/' + productId)
        .then(response => {
            if (!response.ok) {
                throw new Error('Проблем при заявката за информация за продукт: ' + response.statusText);
            }
            return response.json();
        })
        .then(body => {
            var productData = body.data;
            document.getElementById('name').value = productData.name;
            document.getElementById('images').value = productData.images;
            document.getElementById('description').value = productData.description;
            document.getElementById('price').value = productData.price;
            document.getElementById('size').value = productData.size;
            document.getElementById('color').value = productData.color;
            document.getElementById('brand').value = productData.brand;
            document.getElementById('condition').value = productData.condition;
        })
        .catch(error => {
            console.error('Грешка при заявка за информация за продукт:', error.message);
        });
}

function submitProduct(productId, formData) {
    var updateProductUrl = 'http://localhost:8080/products/' + productId;

    fetch(updateProductUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Проблем при заявката за редактиране на продукт: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Успешно редактиран продукт:', data);
            alert("Успешно редактиран продукт!");
            setTimeout(function () {
                window.location.href = '#/products/' + productId;
            }, 500);
        })
        .catch(error => {
            console.error('Грешка при редактиране на продукт:', error.message);
        });
}

