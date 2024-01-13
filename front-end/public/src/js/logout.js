document.addEventListener('DOMContentLoaded', function () {
    var logoutButton = document.getElementById('logout-button');

    logoutButton.addEventListener('click', function () {
        sessionStorage.clear();

        window.location.href = 'index.html';
    });
});
