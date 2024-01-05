document.addEventListener('DOMContentLoaded', function () {
    // Проверка дали потребителят е влязъл
    if (localStorage.getItem('loggedIn') === 'true') {
        document.getElementById('welcome-logged-in').classList.add('visible');
        document.getElementById('welcome-logged-out').classList.add('hidden');
    } else {
        // Потребителят не е влязъл
        document.getElementById('welcome-logged-in').classList.add('hidden');
        document.getElementById('welcome-logged-out').classList.add('visible');
    }
});