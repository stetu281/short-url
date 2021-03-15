document.querySelector('.header__hamburger').addEventListener('click', () => {
    document.querySelector('.header__mobile').classList.toggle('header__mobile--show');
})

let localData = localStorage.getItem('shortLinkData');

if(localData !== null) {
    buildLink(JSON.parse(localData));
}


const url = 'https://api.shrtco.de/v2/shorten?url=';

const input = document.querySelector('.input__input');

document.querySelector('.input__button').addEventListener('click', () => {
    let link = url + input.value;
    
    fetch(link)
        .then((response) => response.json())
        .then((data) => {

            localStorage.setItem('shortLinkData', JSON.stringify(data))

            buildLink(data);

        })
        .catch((error_code) => console.log(error_code))
})


function buildLink(data) {
    let output = `
        <span class="links__input">${data.result.original_link}</span>
        <span class="links__output">${data.result.short_link}</span>
        <button class="links__button links__button--copied">Copy</button>
    `;

    let container = document.createElement('div');
    container.classList.add('links__link-container');
    container.innerHTML = output;

    document.querySelector('.links').appendChild(container);
}