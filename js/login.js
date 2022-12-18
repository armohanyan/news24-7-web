document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.querySelector('input[type=email]').value;
    const password = document.querySelector('input[type=password]').value;
    fetch('https://news24-7-api.herokuapp.com/api/auth/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }
    )
        .then(res => res.json())
        .then(({ data }) => {
            console.log(data);
            if (typeof data === 'string') {
                const now = new Date();
                now.setDate(1);
                document.cookie = 'token=' + data + '; expire=' + now.toUTCString();
                location.replace(`adminPanelAllNews.html`);
            } else if (!document.querySelector('#errorMessage')) {
                document.querySelector('#logo').insertAdjacentHTML('afterend', `
                <div id='errorMessage'>
                    <strong>Սխալ։</strong> 
                    <span>Սխալ օգտագործողի անուն կամ գաղտնաբառ:</span>
                </div>
            `
                );
                document.cookie = 'token=;' + ' expire=Thu, 01 Jan 1970 00:00:00 UTC;';
            }
        })
});