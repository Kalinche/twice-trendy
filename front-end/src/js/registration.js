document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'index.html';
    }

    // Връзка към формата за регистрация
    var registrationForm = document.getElementById('registrationForm');

    // Функция, която се извиква при подаване (submit) на формата
    registrationForm.onsubmit = function (e) {
        e.preventDefault(); // Предотвратява стандартното поведение на браузъра

        // Събиране на данни от формата
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var phoneNumber = document.getElementById('phoneNumber').value;
        var address = document.getElementById('address').value;

        // Валидация на входните данни
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

        // Изпращане на заявка за регистрация към сървъра
        register(email, password, phoneNumber, address);
    };
});

// Функция за валидация на имейл
function validateEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Функция за изпращане на заявка за регистрация
function register(email, password, phoneNumber, address) {
    //TODO: change
    var registerUrl = 'https://example.com/api/register';

    var data = {
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address
    };

    fetch(registerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message); // Предполага се, че сървърът връща съобщение за грешка в 'message'
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Успешна регистрация:', data);
            window.location.href = '../html/login.html';
        })
        .catch(error => {
            console.error('Грешка при регистрация:', error.message);
            alert('Грешка при регистрация: ' + error.message); // Показва съобщение за грешка на потребителя
        });
}
