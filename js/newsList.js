fetch('https://news24-7-api.herokuapp.com/api/news/news-feed')
    .then(response => response.json())
    .then(response => {
        console.log(response)
        const newsList = document.querySelector('.newsList');
        response.data.news.forEach(newsListNews => newsList.insertAdjacentHTML('beforeend', `
        <a href='http://127.0.0.1:5501/post.html?id=${newsListNews.id}'>
            <div class='newsListNews'>
                <img class='newsListImage'src='${newsListNews.image}'
                alt='${newsListNews.imageAlt}' width='90' height='70' >
                <div class='newsListNewsRightBlock'>
                    <span class='newsListDate'>${newsListNews.createdAt}</span>
                    <span class='newsTitle'>${newsListNews.title}</span>
                </div>
            </div>
        </a>
    `));

    //     location.pathname === '/post.html' && document.querySelector('main').insertAdjacentHTML('beforeend', response.data.news.map(readMoreNews => `
    //     <a href='http://127.0.0.1:5501/post.html?id=${readMoreNews.id}'>
    //         <div class='newsListNews'>
    //             <img class='newsListImage'src='${readMoreNews.image}'
    //             alt='${readMoreNews.imageAlt}' width='90' height='70' >
    //             <div class='newsListNewsRightBlock'>
    //                 <span class='newsListDate'>${readMoreNews.createdAt}</span>
    //                 <span class='newsTitle'>${readMoreNews.title}</span>
    //             </div>
    //         </div>
    //     </a>
    // `
    //     ));
    })
    .catch(error => console.error(error))
