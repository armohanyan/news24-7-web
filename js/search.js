document.querySelector('.searchSubmit').addEventListener('click', function(e) {
    e.preventDefault();
    location.replace(`news.html?search=${document.querySelector('.search').value}&page=1`);
});