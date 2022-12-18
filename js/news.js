const urlParams = new URLSearchParams(location.search);
const category = urlParams.get('category');
const limit = 15;
let page = 1;
const mainTag = document.querySelector('main');

category && mainTag.insertAdjacentHTML('afterbegin', `
            <h1 id='pageTitle'>${`Կատեգորիա >> ${category}`}</h1>
`);

const getNews = () => {
    fetch(`https://news24-7-api.herokuapp.com/api/news/${category
        ? `?category=${category}&page=${page}&limit=${limit}`
        : `filter/search?query=${urlParams.get('search')}&page=${page}&limit=${limit}`}`)
        .then(response => response.json())
        .then(response => {
            const news = response.data.news;
            console.log(news);
            mainTag.insertAdjacentHTML('beforeend', `
            <div class='newsWrapper'>
                ${news.map(categoryPost =>
                `
                    <div class='news'>
                        ${category === 'տեսանյութեր' ? categoryPost.iframe : `<img class='newsImage' src='${categoryPost.image ?? ''}'
                        alt='${categoryPost.imageAlt ?? ''}' />`}
                        <div class='newsDescription'>
                            <a class='authorOfPostWrapper' href='https://armnews24-7.herokuapp.com/ post.html?id=${categoryPost.id}'>
                                <img src='${categoryPost.icon}' alt='${categoryPost.author?.author}' width='15' />
                                <span class='authorOfPost'>${categoryPost.author?.author}</span>
                            </a>
                            <a class='newsTitle' href='https://armnews24-7.herokuapp.com/post.html?id=${categoryPost.id}'>${categoryPost.title}</a>
                            <div class='newsDateWrapper'>
                                <img src='/images/calendarIcon.png' alt='calendar icon' width='15'>
                                <time class='date'>${categoryPost.createdAt}</time>
                            </div>
                        </div>
                    </div>
                `
            ).join('')}
            </div>
            <button class='moreButton'>ավելին</button>
                `
            )
            mainTag.children[1].addEventListener('click', () => getNews(page++));
        })
        .catch(() => !category && mainTag.insertAdjacentHTML('afterbegin', `
                <h1 id='pageTitle'> Ձեր որոնմանը, որևէ նյութ չի համընկնում</h1>
            `));
}

getNews(page);