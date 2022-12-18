import getTokenCookie from './getTokenCookie.js';

const postId = new URLSearchParams(location.search).get('id');
let isThereImage = false;

postId && fetch(`https://news24-7-api.herokuapp.com/api/news/${postId}`).then(response => response.json()).then(response => {
    console.log(response);
    const data = response.data;
    document.querySelector('#addNewPostTitle').innerText = 'Խմբագրել գրառումը';
    document.querySelector('#addTitleInput').value = data.title;
    document.querySelector('#postContent').insertAdjacentHTML('afterbegin', data.text);
    document.querySelector('#submitPost').value = 'Թարմացնել';
    data.categories.forEach(category => document.querySelector(`[value='${category.category}']`).setAttribute('checked', ''));
    document.querySelector('#addAuthor').value = data.author.author ?? '';
    document.querySelector('.imageAltInput').value = data.imageAlt;
    document.querySelector('#selectAuthorIcon').value = data.icon;
    if (data.image) {
        document.querySelector('#postImageLabel').insertAdjacentHTML('afterend', `<img width='254' height='254' src='${data.image}' id='featuredPostImage' />`);
        isThereImage = !isThereImage;
    };
})

document.querySelector('#textEditor').addEventListener('keydown', (e) => {
    e.key === 'Enter' && document.createElement('p');
})

const surroundElement = (element) => {
    document.getSelection().getRangeAt(0).surroundContents(element);
    // if(element.getAttribute('data-element').chareAt(0) === 'h') {
    // };
}

document.querySelectorAll('#textEditor button').forEach(textEditorButton => textEditorButton.addEventListener('click', function () {

    const dataElement = this.getAttribute('data-element');
    const element = document.createElement(dataElement);
    surroundElement(element);

    if (dataElement === 'a') {

        const setAttributes = (element, attributes) => {
            Object.keys(attributes).forEach(attr =>
                element.setAttribute(attr, attributes[attr])
            );
        }

        const linkInput = document.createElement('input');
        setAttributes(linkInput, {
            type: 'text',
            id: 'linkInput',
            placeholder: 'Տեղադրեք հղումը',
        });

        const submitLink = document.createElement('button');
        setAttributes(submitLink, {
            type: 'button',
            id: 'insertLink'
        });

        submitLink.insertAdjacentHTML('beforeend', `<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/White_arrow_down.svg/2048px-White_arrow_down.svg.png' alt='submit' id='submitStyleTagIcon'/>`);

        const insertLinkWrapper = document.createElement('div');
        insertLinkWrapper.setAttribute('id', 'insertLinkWrapper');
        insertLinkWrapper.append(linkInput, submitLink);
        element.append(insertLinkWrapper);

        submitLink.addEventListener('click', () => {
            element.removeChild(element.children[0]);
            element.setAttribute('href', linkInput.value);
        });
    }
}));

document.querySelector('#textType').addEventListener('change', function () {
    surroundElement(document.createElement(this.value));
});


document.querySelector('#choosePostImage').addEventListener('change', function () {
    const src = window.webkitURL.createObjectURL(this.files[0]);
    if (!isThereImage) {
        document.querySelector('#postImageLabel').insertAdjacentHTML('afterend', `<img width='254' height='254' src='${src}' id='featuredPostImage' />`);
        isThereImage = !isThereImage;
    } else {
        document.querySelector('#featuredPostImage').setAttribute('src', src);
    }
})

const postForm = document.querySelector('form');

const fetchPost = (method, postId) => {
    const formData = new FormData(postForm);
    formData.set('text', postForm.children[0].children[1].children[1].innerText);
    const icon = formData.get('icon');
    !icon && formData.append('icon', document.querySelector('#iconInput').value);
    console.log([...formData]);
    fetch(`https://news24-7-api.herokuapp.com/api/news/${postId}`, {
        method: method,
        headers: {
            Authorization: `Bearer ${getTokenCookie()}`
        },
        body: formData
    }).then(() => {
        localStorage.setItem(`icon`, icon);
        location.replace('http://127.0.0.1:5501/adminPanelAllNews.html');
    }).then(res => console.log(res))
}

postForm.addEventListener('submit', function (e) {
    e.preventDefault();
    !new URLSearchParams(location.search).has('id')
        ? fetchPost('POST', '')
        : fetchPost('PUT', postId)
});