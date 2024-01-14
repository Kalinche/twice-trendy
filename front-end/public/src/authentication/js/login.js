function setupLoginForm() {
    var loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        console.error('LoginForm not found!');
        return;
    }

    loginForm.onsubmit = function (e) {
        e.preventDefault();

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        if (!validateEmail(email)) {
            alert('Моля, въведете валиден имейл адрес.');
            return;
        }

        if (!password) {
            alert('Моля, въведете парола.');
            return;
        }

        login(email, password);
    };
};
function validateEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function login(email, password) {
    var loginUrl = 'http://localhost:8080/login';

    var data = {
        email: email,
        password: password
    };

    fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log(response);
            if (response.status == 404 || response.status == 500) {
                alert('Грешен имейл или парола.');
                throw new Error('Грешна парола или имейл');
            }
            else if (!response.ok) {
                throw new Error('Проблем при заявката за вход: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Успешен вход:', data);
            const userId = data.userId;
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('userID', userId);
            window.location.href = '#/';
        })
        .catch(error => {
            console.error('Грешка при вход:', error.message);
        });
}

export { setupLoginForm };
