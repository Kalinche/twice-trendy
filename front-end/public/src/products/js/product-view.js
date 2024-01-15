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
            if (4 === parseInt(localStorage.getItem('userId'))) {
                addButtons(body.data.id, 4);
            }
            //TODO: fix
            // if (body.data.userId === parseInt(localStorage.getItem('userId'))) {
            //     addButtons(body.data.id, body.data.userId);
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

    function createDetailElement(label, value) {
        var strong = document.createElement('strong');
        strong.textContent = label;

        var p = document.createElement('p');
        p.appendChild(strong);
        p.appendChild(document.createTextNode(value || 'N/A'));

        return p;
    }

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
        console.log(productId);
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


function addButtons(productId, userId) {
    var details = document.querySelector('.product-buttons');

    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Изтрий";
    deleteButton.setAttribute('class', 'product-button')
    deleteButton.onclick = () => { deleteProduct(productId, userId) }

    var editButton = document.createElement('button');
    editButton.textContent = "Редактирай";
    editButton.setAttribute('class', 'product-button')
    editButton.onclick = () => { window.localStorage.href = '#/products/edit/' + productId }

    details.appendChild(editButton);
    details.appendChild(deleteButton);
}
