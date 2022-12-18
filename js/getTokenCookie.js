const getTokenCookie = () => {
    let name = 'token=';
    let ca = decodeURIComponent(document.cookie).split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

addEventListener('DOMContentLoaded', () => !getTokenCookie() && location.replace('http://127.0.0.1:5501/login.html'));

export default getTokenCookie;