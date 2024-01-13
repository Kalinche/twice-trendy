function loadPage(url) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("app").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function loadNavbar() {
    const navbarPath =
        localStorage.getItem('loggedIn') === 'true' ?
            '/src/html/logged-in-navbar.html' :
            '/src/html/logged-out-navbar.html';

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.querySelector(".navbar").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", navbarPath, true);
    xhttp.send();
}

function navigate(path) {
    loadNavbar();
    if (localStorage.getItem('loggedIn') === 'true') {
        switch (path) {
            case '#/':
            case '#/registration':
            case '#/login':
                loadPage('/src/html/logged-in-index.html');
                break;
            case '#/offers':
                loadPage('/src/html/offers-grid.html');
                break;
            case '#/create-offer':
                loadPage('/src/html/create-offer.html');
                break;
            // case '#/my-offers':
            // loadPage('/src/html/my-offers.html');
            // break;
            // case '#/profile':
            //     if (localStorage.getItem('loggedIn') === 'true') {
            //     loadPage('/src/html/profile.html');
            // } else {
            //     // Пренасочете към страница за вход или началната страница
            //     loadPage('/src/html/login.html');
            // }
            case '#/logout':
                loadPage('/src/html/logout.html');
                break;
            default:
                loadPage('/src/html/not-found.html');
        }
    } else {
        switch (path) {
            case '#/registration':
                loadPage('/src/html/registration.html');
                break;
            case '#/login':
                loadPage('/src/html/login.html');
                break;
            default:
                loadPage('/src/html/logged-out-index.html');
        }
    }
}

window.onhashchange = function () {
    navigate(window.location.hash);
}

// Зареждане на началната страница
loadNavbar();
navigate(window.location.hash);
