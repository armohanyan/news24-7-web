import getTokenCookie from './getTokenCookie.js';

fetch(`https://news24-7-api.herokuapp.com/api/news`)
    .then(response => response.json())
    .then(response =>{
        console.log(response);
        document.querySelector('tbody').insertAdjacentHTML('afterbegin', response.data.news.map(news =>
            `<tr class='post'>
                <td class='titleCell'>
                    <strong class='titleStrongWrapper'>
                        <a class='title' href='https://armnews24-7.herokuapp.com/postEditor.html?id=${news.id}'>${news.title}</a>
                    </strong>
                    <img class='dropdownIcon' src='./images/arrow-down-sign-to-navigate.png' />
                    <div class='editAndDelete'>
                        <a href='https://armnews24-7.herokuapp.com/postEditor.html?id=${news.id}' class='edit'>Խմբագրել</a> |
                        <button class='delete' data-id='${news.id}'>Աղբաման ուղարկել</button>
                    </div>
                </td>
                <div class='dropdownCells'>
                    <td class='author'>${news.author?.author ?? 'Դեսից դենից'}</td>
                    <td class='category'>${news.categories.map(category => `<a> ${category.category}</a>`)}</td>
                    <td class='date'>${news.createdAt}</td>
                </div>
            </tr>
         `).join(''))}
    ).then(() => document.querySelectorAll('.delete').forEach(deleteButton => deleteButton.addEventListener('click', function () {
        fetch(`https://news24-7-api.herokuapp.com/api/news/${this.getAttribute('data-id')}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getTokenCookie()}`
            }
        }).catch(err => console.log(err))
    })))
    .catch(err => console.log(err))




