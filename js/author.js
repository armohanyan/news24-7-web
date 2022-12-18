fetch(`https://news24-7-api.herokuapp.com/api/author/${new URLSearchParams(location.search).get('author-id')}?limit=20&page=1`)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        const data = response.data[0];
        const author = data.author;

        document.querySelector('head').insertAdjacentHTML('afterbegin', `
            <meta name='author' content='${author}'>
            <meta name='keywords' content=''>
            <title>${author} - website</title>
        `);

        document.querySelector('main').insertAdjacentHTML('afterbegin', `
            <div id='authorAndPostCount'>
                <h1 class='author'>${data.author}</h1>
                <p id='authorPostCount'>${data.postsCount} գրառում</p>
            </div>
            <div class='newsWrapper'>
                ${data.news.map(authorPost =>
            `<div class='news'>
                    <img class='newsImage' alt='${authorPost.imageAlt}'
                    src='${authorPost.image}'
                    alt='${authorPost.imageAlt}'>
                    <div class='newsDescription'>
                        <p class='newsTitle'>${authorPost.title}</p>
                        <div class='newsDateWrapper'>
                            <img src='/images/calendarIcon.png' alt='calendar icon' width='15'>
                            <time class='date'>${authorPost.createdAt}</time>
                        </div>
                    </div>
                </div>
                `
        ).join('')}
        </div>
            `
        );
    })
    .catch(error => console.error(error))