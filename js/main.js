//Toggle mobile Navigation

document.querySelector('.header__hamburger').addEventListener('click', () => {
    document.querySelector('.header__mobile').classList.toggle('header__mobile--show');
})


//Check for localstorage

let localData = localStorage.getItem('shortLinkData');

if(localData !== null) {
    buildLink(JSON.parse(localData));
}




const url = 'https://api.shrtco.de/v2/shorten?url=';
const input = document.querySelector('.input__input');
const errorMsg = document.querySelector('.input__error');

document.querySelector('.input__button').addEventListener('click', (e) => {
    e.preventDefault();

    let link = url + input.value;
    
    fetch(link)
        .then((response) => response.json())
        .then(handleErrors)
        .then((data) => {

            localStorage.setItem('shortLinkData', JSON.stringify(data))
            buildLink(data);
            input.value = "";

        })
        .catch((error) => {

            input.classList.add('input__input--error');
            errorMsg.innerHTML = error;

            setTimeout(function () {
                input.classList.remove('input__input--error');
                errorMsg.innerHTML = "";
                input.value = "";
            }, 3000);
            
        })
})


function buildLink(data) {
    let output = `
        <span class="links__input">${data.result.original_link}</span>
        <span class="links__output">${data.result.short_link}</span>
        <button class="links__button">Copy</button>
    `;

    let container = document.createElement('div');
    container.classList.add('links__link-container');
    container.innerHTML = output;

    document.querySelector('.links').appendChild(container);
}

function handleErrors(response) {
    if (!response.ok) {
        if(response.error_code === 1) {
            throw new Error("Please add a url");
        } else if (response.error_code === 2) {
            throw new Error("Please add a valid url")
        } else {
            throw new Error("Something went wrong. Please try again");
        }
    } 
    return response;
    
}