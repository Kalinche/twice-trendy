export function setupUrlsWithIds() {
    const userId = localStorage.getItem('userId');
    if (userId) {
        const urlWithIdElements = document.getElementsByClassName('withUserId');
        Array.from(urlWithIdElements).forEach(element => {
            element.href = element.href + "/user/" + userId;
        });
    }
};
