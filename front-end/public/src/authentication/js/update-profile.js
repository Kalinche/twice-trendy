export function setupUpdateProfileForm() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = '#/login';
        return;
    }


    document.getElementById('formTitle').textContent = "Редактиране на профила";
    document.getElementById('profileFomButton').textContent = "Запази";

    populateForm();

    var profileForm = document.getElementById('profileForm');

    profileForm.onsubmit = function (e) {
        e.preventDefault();

        var name = document.getElementById('name').value
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var phoneNumber = document.getElementById('phoneNumber').value;
        var address = document.getElementById('address').value;

        if (!validateEmail(email)) {
            alert('Моля, въведете валиден имейл адрес.');
            return;
        }

        if (password && !validatePassword(password)) {
            alert('Паролата трябва да има поне 8 символа, поне една цифра и поне една главна буква.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Паролите не съвпадат.');
            return;
        }

        if (!phoneNumber) {
            alert('Моля, въведете телефонен номер.');
            return;
        }

        updateProfile(name, email, password, phoneNumber, address);
    };
};

function populateForm() {
    var userId = localStorage.getItem('userId');
    fetch(`http://localhost:8080/users/${userId}`)
        .then(response => response.json())
        .then(body => {
            const user = body.data;
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            document.getElementById('phoneNumber').value = user.phone;
            document.getElementById('address').value = user.address;
        })
        .catch(error => {
            console.error('Грешка при зареждане на данни:', error);
        })
}

function updateProfile(name, email, password, phoneNumber, address) {
    var updateUrl = `http://localhost:8080/users/${localStorage.getItem('userId')}`;

    var data = {
        name: name,
        email: email,
        phone: phoneNumber,
        address: address,
        password: password
    };

    fetch(updateUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Проблем при заявката за редактиране на профил: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Успешно редактиран профил:', data);
            alert("Успешно редактиран профил!");
            setTimeout(function () {
                window.location.href = '#/';
            }, 500);
        })
        .catch(error => {
            console.error('Грешка при редактиране на профил:', error.message);
        });
}


function validateEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function validatePassword(password) {
    var pattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    return pattern.test(password);
}
