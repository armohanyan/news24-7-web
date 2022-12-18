fetch(`https://news24-7-api.herokuapp.com/api/news?category=տեսանյութեր&page=1&limit=6`)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        response.data.news.map(videoNews => {
            document.querySelector('.videoSection').insertAdjacentHTML('afterbegin', `
                <a href='./post.html?id=${videoNews.id}'>
                    <div class='videoNews'>
                        ${videoNews.iframe}
                        <div class='iframeWrapper'></div>
                        <div class='videoNewsTextBlock'>
                            <p class='videoNewsTitle'>${videoNews.title}</p>
                            ${videoNews.text}
                        </div>
                    </div>
                </a>
                        `);
        });
    })
    .catch(error => console.error(error))

fetch(`https://news24-7-api.herokuapp.com/api/news/?category=գլխավոր&page=1&limit=5`)
    .then(response => response.json())
    .then(response => {
        const news = response.data.news;
        console.log(news);
        document.querySelector('#topNews').insertAdjacentHTML('afterbegin', `
            <a class='topNewsLinkWrapper' href='http://127.0.0.1:5501/post.html?id=${news[0].id}'>
                <img class='topNewsImage' src='${news[0].image}' alt='${news[0].imageAlt ?? ''}'>
                <p class='topNewsTitle'>${news[0].title}</p>
            </a>
        `);

        news.slice(1).forEach(mainNews => {
            document.querySelector('.mainNewsItems').insertAdjacentHTML('afterbegin', `
            <div class='mainNewsItem'>
                <a href='http://127.0.0.1:5501/post.html?id=${mainNews.id}'>${mainNews.title}</a>
            </div>`);
        });
    })
    .catch(error => console.error(error))