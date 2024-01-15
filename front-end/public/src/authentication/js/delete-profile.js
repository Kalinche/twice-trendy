export function setupDeleteProfileButton() {
    document.getElementById('deleteProfileBtn').addEventListener('click', function () {
        const confirmed = confirm('Сигурни ли сте, че искате да изтриете вашия профил?');

        if (confirmed) {
            const userId = localStorage.getItem('userId');


            fetch(`http://localhost:8080/users/${userId}`, {
                method: 'DELETE'
                // Допълнителни настройки за заявката, ако е необходимо
            })
                .then(response => {
                    if (!response.ok) {
                        // Обработка на грешка от сървъра
                        throw new Error('Възникна грешка при изтриване на профила: ' + response.statusText);
                    }
                })
                .then(data => {
                    alert('Профилът беше успешно изтрит.');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('loggedIn');
                    setTimeout(function () {
                        window.location.href = '#/';
                    }, 500);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                    alert('Грешка при изтриване на профила: ' + error.message);
                });
        }
    })
};
