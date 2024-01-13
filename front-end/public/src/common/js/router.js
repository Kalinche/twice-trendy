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
        // localStorage.getItem('loggedIn') === 'true' ?
        '/src/common/html/logged-in-navbar.html';
    // '/src/common/html/logged-out-navbar.html';

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
    if (localStorage.getItem('loggedIn') !== 'true') {
        switch (path) {
            case '#/':
                loadPage('/src/common/html/logged-in-index.html');
                break;
            case '#/registration':
            case '#/login':
                window.location.href = '#/';
                break;
            case '#/offers':
                loadPage('/src/products/html/offers-grid.html');
                break;
            case '#/create-offer':
                loadPage('/src/products/html/create-offer.html');
                break;
            // case '#/my-offers':
            // loadPage('/src/products/html/my-offers.html');
            // break;
            // case '#/profile':
            //     if (localStorage.getItem('loggedIn') === 'true') {
            //     loadPage('/src/products/html/profile.html');
            // } else {
            //     // Пренасочете към страница за вход или началната страница
            //     loadPage('/src/products/html/login.html');
            // }
            case '#/delete-profile':
                loadPage('/src/authentication/html/delete-profile.html');
                break;
            case '#/logout':
                loadPage('/src/authentication/html/logout.html');
                break;
            default:
                loadPage('/src/common/html/not-found.html');
        }
    } else {
        switch (path) {
            case '#/registration':
                loadPage('/src/authentication/html/registration.html');
                break;
            case '#/login':
                loadPage('/src/authentication/html/login.html');
                break;
            default:
                loadPage('/src/common/html/logged-out-index.html');
        }
    }
}

window.onhashchange = function () {
    navigate(window.location.hash);
}

// Зареждане на началната страница
loadNavbar();
navigate(window.location.hash);
