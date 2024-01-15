export function setupProductView(productId) {
    fetch('http://localhost:8080/products/' + productId)
        .then(response => {
            if (response.status == 404) {
                window.location.href = '#/not-found';
            }
            else if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(body => {
            //TODO: fix
            // const username = fetchUsername(body.data.userId);
            populateProductDetails(body.data, "kguzunova");
            if (body.data.status === "Available") {
                if (4 === parseInt(localStorage.getItem('userId'))) {
                    addEditButtons(body.data.id, 4);
                } else {
                    addOrderButton(body.data.id, 4);
                }
            } else {
                populateOrderDetails(body.data.id);
            }
            //TODO: fix
            // if (body.data.userId === parseInt(localStorage.getItem('userId'))) {
            //     addEditButtons(body.data.id, body.data.userId);
            // } else {
            //     addOrderButton(body.data.id, body.data.userId);
            // }
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
};

function fetchUsername(userId) {
    fetch('http://localhost:8080/users/' + userId)
        .then(response => {
            if (response.status == 404) {
                throw new Error('No existing user with the id: ', userId);
            }
            else if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(body => {
            console.log(body);
            return body.data.username;
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
}

function populateProductDetails(data, username) {
    document.querySelector('.product-container h1').textContent = data.name;

    var imagesContainer = document.querySelector('.product-images');
    var img = document.createElement('img');
    img.src = data.images;
    imagesContainer.appendChild(img);

    var details = document.querySelector('.product-characteristics');

    details.appendChild(createDetailElement('Автор: ', username));
    details.appendChild(createDetailElement('Описание: ', data.description));
    details.appendChild(createDetailElement('Цена: ', data.price, "лв."));
    details.appendChild(createDetailElement('Размер: ', data.size));
    details.appendChild(createDetailElement('Цвят: ', data.color));
    details.appendChild(createDetailElement('Марка: ', data.brand));
    details.appendChild(createDetailElement('Състояние на дрехата: ', data.condition));
    details.appendChild(createDetailElement('Статус на обявата: ', data.status));
}

function deleteProduct(productId, userId) {
    const confirmed = confirm("Наистина ли искате да изтриете този продукт?");

    if (confirmed) {
        fetch(`http://localhost:8080/products/${productId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Възникна грешка при изтриване на продукта: ' + response.statusText);
                }
            })
            .then(data => {
                alert('Продуктът беше успешно изтрит.');
                setTimeout(function () {
                    window.location.href = '#/products/user/' + userId;
                }, 500);
            })
            .catch(error => {
                console.error('Error:', error.message);
                alert('Грешка при изтриване на продукта: ' + error.message);
            });
    }
}

function addEditButtons(productId, userId) {
    var buttons = document.querySelector('.product-buttons');

    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Изтрий";
    deleteButton.setAttribute('class', 'product-button')
    deleteButton.onclick = () => { deleteProduct(productId, userId) }

    var editButton = document.createElement('button');
    editButton.textContent = "Редактирай";
    editButton.setAttribute('class', 'product-button')
    editButton.onclick = () => { window.location.href = '#/products/edit/' + productId }

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
}

function orderProduct(productId, userId,) {
    const address = document.querySelector('.address-text-field').textContent;

    var data = {
        userId: userId,
        productId: productId,
        address: address
    }

    //TODO: change to orders
    var createOrderUrl = 'http://localhost:8080/order';

    fetch(createOrderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Проблем при заявката за създаване на поръчка: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Успешно създадена поръчка:', data);
            alert("Успешно създадена поръчка!");
            setTimeout(function () {
                window.location.href = '#/orders';
            }, 500);
        })
        .catch(error => {
            console.error('Грешка при създаване на поръчка:', error.message);
        });

}

function addOrderButton(productId, userId) {
    var buttons = document.querySelector('.product-buttons');

    var button = document.createElement('button');
    button.textContent = "Поръчай";
    button.setAttribute('class', 'product-button');
    button.onclick = () => { orderProduct(productId, userId); };

    var addressTextField = document.createElement('input');
    addressTextField.setAttribute('class', 'address-text-field');
    addressTextField.setAttribute('type', 'address');
    addressTextField.setAttribute('id', 'address');
    addressTextField.setAttribute('name', 'address');
    addressTextField.setAttribute('placeholder', 'Адрес за доставка');
    addressTextField.setAttribute('required', 'required');

    buttons.appendChild(addressTextField);
    buttons.appendChild(button);
}

function populateOrderDetails(productId) {
    var getOrderUrl = 'http://localhost:8080/orders' + productId;
    var username = "kguzunova";

    //TODO: implement
    // fetch(getOrderUrl)
    //     .then(response => {
    //         if (response.status == 404) {
    //             throw new Error("Няма намерена поръчка за този продукт.");
    //         }
    //         else if (!response.ok) {
    //             throw new Error(response.statusText);
    //         }
    //         return response.json();
    //     })
    //     .then(body => {
    //         console.log(body.data);
    //         //TODO: implement;
    //         // username = fetchUserName(body.data.userId);
    //     })
    //     .catch(error => {
    //         console.error('Грешка при вземане на поръчка:', error.message);
    //     });

    var details = document.querySelector('.product-characteristics');

    details.appendChild(createDetailElement('Закупен от: ', username));
}

function createDetailElement(label, value) {
    var strong = document.createElement('strong');
    strong.textContent = label;

    var p = document.createElement('p');
    p.appendChild(strong);
    p.appendChild(document.createTextNode(value || 'N/A'));

    return p;
}
