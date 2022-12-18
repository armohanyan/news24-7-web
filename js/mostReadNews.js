const getFilteredMostReadNews = (apiParameters) => {
    fetch(`https://news24-7-api.herokuapp.com/api/news/filter/more-readable?${apiParameters}&page=1&limit=5`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            const mostReadNewsScrollBar = document.createElement('div');
            mostReadNewsScrollBar.setAttribute('id', 'mostReadNewsScrollBar');
            mostReadNewsScrollBar.insertAdjacentHTML('afterbegin', response.data.map(mostReadNewsItem => {
                const news = mostReadNewsItem.news;
                return `
                <div class='mostReadNews'>
                    <a href='http://127.0.0.1:5501/post.html?id=${news.id}'>
                        <img class='mostReadNewsImage' src='${news.image}' alt='${news.imageAlt ?? ''}' height='85' width='85'>
                    </a>
                    <div class='mostReadNewsRightBlock'>
                        <a class='mostReadNewsTitle' href='http://127.0.0.1:5501/post.html?id=${news.id}'>${news.title}</a>
                        <div class='postAuthorAndViewCount'>
                            <div class='postAuthorWrapper'>
                                <a class='postAuthor' href='http://127.0.0.1:5501/post.html?id=${news.id}>
                                <img src='${news.icon}' alt='${news.newsAuthorIconAlt}' width='18'>
                                ${news.author?.name ?? 'Լրագրող'}
                                </a>
                            </div>
                            <div class='viewCountWrapper'>
                                <img class='viewCountIcon' src='./images/viewCountIcon.png' alt='view count icon' width='19' >
                                <span class='viewCount'>${mostReadNewsItem.views}</span>
                            </div>
                        </div>    
                    </div>
                </div>
        `
            }).join(''))
            document.querySelector('#mostReadNewsScrollBar').replaceWith(mostReadNewsScrollBar)
        }).catch(err => console.error(err))
}

getFilteredMostReadNews('');

document.querySelectorAll('.dateFilter').forEach(dateFilter => dateFilter.addEventListener('click', function () {
    console.log(this.innerText);
    this.innerText === 'օր'
        ? getFilteredMostReadNews('') : this.innerText === 'շաբաթ' ? getFilteredMostReadNews("date=week") : getFilteredMostReadNews("date=month")
}));

