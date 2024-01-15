import { setupUrlsWithIds } from "./logged-in-navbar.js";
import { setupLoginForm } from "../../authentication/js/login.js";
import { setupLogoutButton } from "../../authentication/js/logout.js";
import { setupDeleteProfileButton } from "../../authentication/js/delete-profile.js";
import { setupRegistrationForm } from "../../authentication/js/registration.js";
import { setupProductsGrid } from "../../products/js/products-grid.js";
import { setupProductView } from "../../products/js/product-view.js";
import { setupCreateProductForm } from "../../products/js/create-product.js";
import { setupUpdateProductForm } from "../../products/js/update-product.js";

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

    new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    document.querySelector(".navbar").innerHTML = this.responseText;
                    resolve();
                } else {
                    reject('Страницата не може да бъде заредена');
                }
            }
        };
        xhttp.open("GET", navbarPath, true);
        xhttp.send();
    })
        .then(() => {
            setupUrlsWithIds();
        });
}

function parseUrl(url) {
    const parts = url.split('/');
    var entity;
    var id;

    if (isNaN(parts[2])) {
        entity = parts[2];
        id = parts[3];
    } else {
        entity = parts[1].slice(0, -1);
        id = parts[2];
    }

    return {
        path: parts[0] + "/" + parts[1],
        entity: entity,
        id: id
    };
}

function navigate(path) {
    const { path: basePath, entity, id } = parseUrl(path);
    loadNavbar()

    if (localStorage.getItem('loggedIn') === 'true') {
        switch (basePath) {
            case '#/':
                loadPage('/src/common/html/logged-in-index.html');
                break;
            case '#/registration':
            case '#/login':
                window.location.href = '#/';
                break;
            case '#/products':
                if (entity == "edit") {
                    loadPage('/src/products/html/product-form.html')
                        .then(() => {
                            setupUpdateProductForm(id);
                        });
                }
                else if (entity != "product") {
                    loadPage('/src/products/html/products-grid.html')
                        .then(() => {
                            setupProductsGrid(id);
                        });
                } else {
                    loadPage('/src/products/html/product-view.html')
                        .then(() => {
                            setupProductView(id);
                        });
                }
                break;
            case '#/create-product':
                loadPage('/src/products/html/product-form.html')
                    .then(() => {
                        setupCreateProductForm();
                    });
                break;
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
                        setupDeleteProfileButton();
                    });
                break;
            case '#/logout':
                loadPage('/src/authentication/html/logout.html')
                    .then(() => {
                        setupLogoutButton();
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
