import { setupLoginForm } from "../../authentication/js/login.js";
import { loadLogoutButton } from "../../authentication/js/logout.js";
import { loadDeleteProfileButton } from "../../authentication/js/delete-profile.js";
import { setupRegistrationForm } from "../../authentication/js/registration.js";
import { loadProductsGrid } from "../../products/js/products-grid.js";

function loadPage(url) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    document.getElementById("app").innerHTML = this.responseText;
                    resolve();
                } else {
                    reject('Страницата не може да бъде заредена');
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    });
}

function loadNavbar() {
    const navbarPath =
        localStorage.getItem('loggedIn') === 'true' ?
            '/src/common/html/logged-in-navbar.html' :
            '/src/common/html/logged-out-navbar.html';

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.querySelector(".navbar").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", navbarPath, true);
    xhttp.send();
}

function loadScript(scriptUrl) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
}

function navigate(path) {
    loadNavbar();
    if (localStorage.getItem('loggedIn') === 'true') {
        switch (path) {
            case '#/':
                loadPage('/src/common/html/logged-in-index.html');
                break;
            case '#/registration':
            case '#/login':
                window.location.href = '#/';
                break;
            case '#/products':
                loadPage('/src/products/html/products-grid.html')
                    .then(() => {
                        loadProductsGrid();
                    });
                break;
            case '#/create-product':
                loadPage('/src/products/html/create-product.html');
                break;
            // case '#/my-products':
            // loadPage('/src/products/html/my-products.html');
            // break;
            // case '#/profile':
            //     if (localStorage.getItem('loggedIn') === 'true') {
            //     loadPage('/src/products/html/profile.html');
            // } else {
            //     // Пренасочете към страница за вход или началната страница
            //     loadPage('/src/products/html/login.html');
            // }
            case '#/delete-profile':
                loadPage('/src/authentication/html/delete-profile.html')
                    .then(() => {
                        loadDeleteProfileButton();
                    });
                break;
            case '#/logout':
                loadPage('/src/authentication/html/logout.html')
                    .then(() => {
                        loadLogoutButton();
                    });
                break;
            default:
                loadPage('/src/common/html/not-found.html');
        }
    } else {
        switch (path) {
            case '#/registration':
                loadPage('/src/authentication/html/registration.html')
                    .then(() => {
                        setupRegistrationForm();
                    });
                break;
            case '#/login':
                loadPage('/src/authentication/html/login.html')
                    .then(() => {
                        setupLoginForm();
                    });
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
