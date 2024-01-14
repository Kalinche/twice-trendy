export function loadDeleteProfileButton() {
    document.getElementById('deleteProfileBtn').addEventListener('click', function () {
        const confirmed = confirm('Сигурни ли сте, че искате да изтриете вашия профил?');

        if (confirmed) {
            const userID = localStorage.getItem('userID');
            console.log(userID);

            fetch(`https://localhost:8080/users/${userID}`, {
                method: 'DELETE'
                // Допълнителни настройки за заявката, ако е необходимо
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    // Редирект или покажете съобщение за успешно изтриване
                    window.location.href = '#/'; // Пренасочване към началната страница
                })
                .catch(error => console.error('Error:', error));
        }
    })
};
