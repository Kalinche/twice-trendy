export function loadDeleteProfileButton() {
    document.getElementById('deleteProfileBtn').addEventListener('click', function () {
        const confirmed = confirm('Сигурни ли сте, че искате да изтриете вашия профил?');

        if (confirmed) {
            const userID = localStorage.getItem('userID');


            fetch(`http://localhost:8080/users/${userID}`, {
                method: 'DELETE'
                // Допълнителни настройки за заявката, ако е необходимо
            })
                .then(response => {
                    if (response.status != 204) {
                        // Обработка на грешка от сървъра
                        throw new Error('Възникна грешка при изтриване на профила: ' + response.statusText);
                    }
                })
                .then(data => {
                    alert('Профилът беше успешно изтрит.');
                    window.location.href = '#/';
                    localStorage.removeItem('userID');
                    localStorage.removeItem('loggedIn');
                })
                .catch(error => {
                    console.error('Error:', error.message);
                    alert('Грешка при изтриване на профила: ' + error.message);
                });
        }
    })
};
