document.addEventListener('DOMContentLoaded', function () {
    // Връзка към формата за регистрация
    var registrationForm = document.getElementById('registrationForm');

    // Функция, която се извиква при подаване (submit) на формата
    registrationForm.onsubmit = function (e) {
        e.preventDefault(); // Предотвратява стандартното поведение на браузъра

        // Събиране на данни от формата
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;

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

        // Изпращане на заявка за регистрация към сървъра
        register(email, password);
    };
});

// Функция за валидация на имейл
function validateEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Функция за изпращане на заявка за регистрация
function register(email, password) {
    //TODO: Определяне на URL към сървърния endpoint за регистрация
    var registerUrl = 'https://example.com/api/register';

    // Подготовка на данните за изпращане
    var data = {
        email: email,
        password: password
    };

    // Използване на fetch API за изпращане на заявката
    fetch(registerUrl, {
        method: 'POST', // Метод на заявката
        headers: {
            'Content-Type': 'application/json' // Указване на типа на съдържанието
        },
        body: JSON.stringify(data) // Преобразуване на данните в JSON формат
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Проблем при заявката за регистрация: ' + response.statusText);
            }
            return response.json(); // Обработка на JSON отговора
        })
        .then(data => {
            console.log('Успешна регистрация:', data);
            // Тук можете да добавите логика при успешна регистрация, например пренасочване към страницата за вход
        })
        .catch(error => {
            console.error('Грешка при регистрация:', error);
            // Тук можете да добавите логика за обработка на грешки
        });
}
