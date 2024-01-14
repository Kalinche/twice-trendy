export function setupRegistrationForm() {
    if (localStorage.getItem('loggedIn') === 'true') {
        window.location.href = '#/';
    }

    // Връзка към формата за регистрация
    var registrationForm = document.getElementById('registrationForm');

    // Функция, която се извиква при подаване (submit) на формата
    registrationForm.onsubmit = function (e) {
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

        if (!password) {
            alert('Моля, въведете парола.');
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

        register(name, email, password, phoneNumber, address);
    };
};

function validateEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function register(name, email, password, phoneNumber, address) {
    var registerUrl = 'http://localhost:8080/register';

    var data = {
        name: name,
        email: email,
        phone: phoneNumber,
        address: address,
        password: password
    };

    console.log(data);
    fetch(registerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status == 406) {
                throw new Error("Имейлът вече е регистриран.");
            }
            else if (!response.ok) {
                throw new Error('Проблем при заявката за регистрация: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Успешна регистрация:', data);
            alert("Успешна регистрация");
            setTimeout(function () {
                window.location.href = '#/login';
            }, 500);
        })
        .catch(error => {
            console.error('Грешка при регистрация:', error.message);
            alert('Грешка при регистрация: ' + error.message);
        });
}
