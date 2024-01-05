document.addEventListener('DOMContentLoaded', function () {
    // Връзка към формата за вход
    var loginForm = document.getElementById('loginForm');

    // Функция, която се извиква при подаване (submit) на формата
    loginForm.onsubmit = function (e) {
        e.preventDefault(); // Предотвратява стандартното поведение на браузъра

        // Събиране на данни от формата
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // Валидация на входните данни
        if (!validateEmail(email)) {
            alert('Моля, въведете валиден имейл адрес.');
            return;
        }

        if (!password) {
            alert('Моля, въведете парола.');
            return;
        }

        // Изпращане на заявка за вход към сървъра
        login(email, password);
    };
});

// Функция за валидация на имейл
function validateEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Функция за изпращане на заявка за вход
function login(email, password) {
    //TODO: Определяне на URL към сървърния endpoint за вход
    var loginUrl = 'https://example.com/api/login';

    // Подготовка на данните за изпращане
    var data = {
        email: email,
        password: password
    };

    // Използване на fetch API за изпращане на заявката
    fetch(loginUrl, {
        method: 'POST', // Метод на заявката
        headers: {
            'Content-Type': 'application/json' // Указване на типа на съдържанието
        },
        body: JSON.stringify(data) // Преобразуване на данните в JSON формат
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Проблем при заявката за вход: ' + response.statusText);
            }
            return response.json(); // Обработка на JSON отговора
        })
        .then(data => {
            console.log('Успешен вход:', data);
            // Тук можете да добавите логика при успешен вход, например пренасочване
        })
        .catch(error => {
            console.error('Грешка при вход:', error);
            // Тук можете да добавите логика за обработка на грешки
        });
}

