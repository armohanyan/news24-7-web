fetch(`https://news24-7-api.herokuapp.com/api/news/${new URLSearchParams(window.location.search).get('id')}`)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        const data = response.data;
        document.querySelector('main').insertAdjacentHTML('afterbegin', `
        <h1>
            ${data.title}
        </h1>
        <div class='postContent'>
            <div class='aboutPost'>
                <div class='postDateAndTimeWrapper'>
                    <img src='./images/timeIcon.png' alt='time icon'>
                    <time class='postDateAndTime'>${data.createdAt}</time>
                </div>
                <p class='region'>Տարածաշրջան: <a href='#'>Հայաստան</a></p>
                <p>Թեմա։ ${data.categories.map(category => `<a> ${category.category}</a>`)} </p>
            </div>
            <div class='postPageSocialNetworks'>
                <img class='qaq' src='./images/SocialNetworkIcons/Facebook_logo_(square).png' alt='Facebook'>
                <img src='' alt='Wk'>
                <img src='/images/SocialNetworkIcons/square-telegram-icon.png' alt='Telegram'>
            </div>
            <div class='post'>
                <img class='postImage' src='${data.image}' alt='${data.imageAlt}'/>
                ${data.text}
            </div>
        </div>
        `)
    })
    .catch(error => console.error(error))

fetch(`https://news24-7-api.herokuapp.com/api/news?category=կարդացեք-նաև&page=1&limit=6`)
    .then(response => response.json())
    .then(response => {
        const data = response.data;
        console.log(response.data)
        document.querySelector('#readAlsoPosts').insertAdjacentHTML('afterbegin', `
        <a href='./post.html?id=''>
        <div class='videoNews'>
            <img src='${data.iamge}'/>
            <div class='iframeWrapper'></div>
            <div class='videoNewsTextBlock'>
                <p class='videoNewsTitle'> Deserunt ea, repellendus inventore tenetur culpa quisquam.</p>
                <p> doloremque fuga unde! Consectetur harum veniam dignissimos vitae?</p>
            </div>
        </div>
    </a>
        `)
    })
    .catch(error => console.error(error))

