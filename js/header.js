const weekdays = ['Կիրակի', 'Երկուշաբթի', 'Երեքշաբթի', 'Չորեքշաբթի', 'Հինգշաբթի', 'Ուրբաթ', 'Շաբաթ'];
const months = ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'];
const date = new Date();
document.querySelector('.weekday').innerText = `${weekdays[date.getDay()]}`;
document.querySelector('.month').innerText = `${months[date.getMonth()]}`;
document.querySelector('.day').innerText = `${date.getDate()}`;

fetch('https://openexchangerates.org/api/latest.json?app_id=3083305922414de9bd3dbaa285390d84&base=USD')
    .then(response => response.json())
    .then(response => {
        const rates = response.rates;

        // code 1
        // function setRateExchange(rateElement, rate) {
        //     document.querySelector(rateElement).innerText = rate.toString().slice(0, 6);
        // }
        // setRateExchange('.USDRate', rates.AMD);
        // setRateExchange('.EURRate', rates.AMD / rates.EUR);
        // setRateExchange('.RUBRate', rates.AMD / rates.RUB);

        document.querySelector('.exchangeRates').insertAdjacentHTML('afterbegin', `
            <div>
                <p class='currency'>USD</p>
                <p class='rate'>${rates.AMD.toString().slice(0, 6)}</p>
            </div>
            <div>
                <p class='currency'>EUR</p>
                <p class='rate'>${(rates.AMD / rates.EUR).toString().slice(0, 6)}</p>
            </div>
            <div>
                <p class='currency'>RUB</p>
                <p class='rate'>${(rates.AMD / rates.RUB).toString().slice(0, 6)}</p>
            </div>
        `)
    })
    .catch(err => console.error(err));

fetch('http://api.weatherapi.com/v1/current.json?key=9700347fcb3a4e07a39102454220901&q&q=Yerevan&aqi=no')
    .then(response => response.json())
    .then(response => {
        document.querySelector('.cityWeather').innerText = response.location.name;
        document.querySelector('.weatherIcon').src = response.current.condition.icon;
        document.querySelector('.degreeCelsius').innerText = response.current.temp_c + '°C';
    })
    .catch(err => console.error(err))

const observer = new IntersectionObserver(function (entries, observer) {
    const nav = document.querySelector('nav');
    !entries[0].isIntersecting
        ? nav.style.cssText = 'position: fixed; z-index: 999; top: 0; background-color:white;' : nav.style.cssText = 'position: static; z-index: 3;';
});

observer.observe(document.querySelector('header'));


let isClicked = false;

let hamburgerToggle = (element, hamburgerElement, newHamburgerSrc, oldHamburgerSrc) => {
    const modal = document.querySelector(element);

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.querySelector(hamburgerElement).src = oldHamburgerSrc;
            document.querySelector('.newsListhamburgerWrapper').classList.remove('activeNewsListHamburgerWrapper');
            document.querySelector('body').style.overflow = 'visible';
            document.querySelector('header').classList.remove('hamburgerActiveHeader');
        };
    };

    if (!isClicked) {
        document.querySelector(hamburgerElement).src = newHamburgerSrc;
        document.querySelector(element).style.display = 'flex';
        if (hamburgerElement === '.newsListHamburger') {
            document.querySelector('.newsListhamburgerWrapper').classList.add('activeNewsListHamburgerWrapper');
            document.querySelector('body').style.overflow = 'hidden';
            document.querySelector('header').classList.add('hamburgerActiveHeader');
        };
        isClicked = true;
    } else {
        document.querySelector(hamburgerElement).src = oldHamburgerSrc;
        if (hamburgerElement === '.newsListHamburger') {
            document.querySelector('.newsListhamburgerWrapper').classList.remove('activeNewsListHamburgerWrapper');
            document.querySelector('body').style.overflow = 'visible';
            document.querySelector('header').classList.remove('hamburgerActiveHeader');
        }
        document.querySelector(element).style.display = 'none';
        isClicked = false;
    }
};