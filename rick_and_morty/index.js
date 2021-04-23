// DOM elements
const serverStatus = document.getElementById('serverStatus');
const loadedCharacters = document.getElementById('loadedCharacters');
const mainCharacterHeader = document.getElementById('mainCharacterHeader');
const mainCharacterName = document.getElementById('mainCharacterName');
const mainCharacter = document.getElementById('mainCharacter');
const mainCharacterImage = document.getElementById('mainCharacterImage');
const starsBurstingEffect = document.getElementById('starsBurstingEffect');
const grid = document.getElementById('grid');

const API_URL = 'https://rickandmortyapi.com/api/character/';
const TOTAL_API_CHARACTERS = 671;
const GRID_WIDTH = grid.getBoundingClientRect().width;
const GRID_GAP = 10;
const GRID_ROWS = 4;
const CELL_WIDTH = 100;
const REQUESTED_CHARACTERS = Math.floor((GRID_WIDTH + GRID_GAP) / (CELL_WIDTH + GRID_GAP)) * GRID_ROWS;
const SHOW_INTERVAL = 50;
const GLOW_TIME = 1000;
const AFTER_MATCH_TIME = 3000;

let wantedCharacter = {};

function restartQuest() {
    mainCharacterImage.classList.remove('scale-up-animation');
    mainCharacterImage.setAttribute('src', './assets/loading.gif');
    mainCharacterImage.setAttribute('alt', 'Loading');
    starsBurstingEffect.classList.add('display--none');
    injectCharactersHTML(REQUESTED_CHARACTERS);
    fetchRandomIDs(REQUESTED_CHARACTERS);
}

// Insert cells into grid
function injectCharactersHTML(numberOfCharacters) {
    grid.innerHTML = '';

    for (let i = 0; i < numberOfCharacters; i++) {
        grid.insertAdjacentHTML('beforeend', `
            <div id="character${i}" class="grid__character" data-id="null">
                <div class="cube">
                    <img id="characterImage" class="character__image" src="./assets/loading.gif" alt="Loading">
                    <div id="characterInfo" class="character__info text--small text--contrast">
                        <img id="characterStatus" class="character__status" src="./assets/icon-warning.png" alt="Warning">
                    </div>
                </div>
            </div>
        `);
    }
}

// Generate array of random IDs, choose random wanted character and fetch random characters
function fetchRandomIDs(numberOfIDs) {
    let index = 1;
    let allCharactersIDs = new Array(TOTAL_API_CHARACTERS).fill(null).map(() => index++);
    let randomIDs = [];

    for (let i = 0; i < numberOfIDs; i++) {
        let randomIndex = Math.floor((Math.random() * allCharactersIDs.length));
        randomIDs.push(allCharactersIDs.splice(randomIndex, 1)[0]);
    }

    wantedCharacter.id = randomIDs[Math.floor((Math.random() * numberOfIDs))];
    fetchCharacters(randomIDs).then(onFetchCharactersResolve).catch(onFetchCharactersReject);
}

// Request characters to API
function fetchCharacters(arrayID) {
    return new Promise((resolve, reject) => {
        fetch(API_URL + arrayID)
            .then(response => {
                serverStatus.textContent = 'UP';
                if (response.ok) {
                    resolve(response);
                } else {
                    reject(new Error(`The HTTP request failed - ${response.status}`));
                }
            })
            .catch(error => {
                serverStatus.textContent = 'DOWN';
                reject(new Error('The API server is not responding'));
            });
    });
}

// Fetch characters resolve
function onFetchCharactersResolve(response) {
    serverStatus.classList.replace('tag--wrong', 'tag--right');

    response.json()
        .then(characters => {
            const fetchedCharacters = characters.length;
            loadedCharacters.textContent = String(fetchedCharacters);
            let matchingCharacter = characters.find(character => character.id === wantedCharacter.id);
            wantedCharacter.name = matchingCharacter.name;
            wantedCharacter.image = matchingCharacter.image;
            mainCharacterName.innerText = wantedCharacter.name;

            for (let i = 0; i < fetchedCharacters; i++) {
                let target = {
                    character: document.getElementById(`character${i}`),
                    picture: document.querySelector(`#character${i} #characterImage`),
                    info: document.querySelector(`#character${i} #characterInfo`),
                    alive: document.querySelector(`#character${i} #characterStatus`)
                };

                setTimeout(() => {
                    target.character.classList.add('scale-up-animation');
                    displayOnGrid(characters[i], target);
                    target.character.addEventListener('click', checkCharacterMatch);
                }, SHOW_INTERVAL * i);
            }

        })
        .catch(error => {
            displayError(error);
        });
}

// Fetch characters reject
function onFetchCharactersReject(error) {
    displayError(error);
    serverStatus.classList.replace('tag--right', 'tag--wrong');
}

// Display character properties in grid
function displayOnGrid({ id, name, status, image }, { character, picture, info, alive }) {
    character.dataset.id = id;
    picture.setAttribute('src', image);
    picture.setAttribute('alt', name);
    info.insertAdjacentHTML('afterbegin', `ID: ${id}<br>${name}`);

    switch (status.toLowerCase()) {
        case 'alive':
            alive.setAttribute('src', './assets/icon-heartbeat.png');
            alive.setAttribute('alt', status);
            break;
        case 'dead':
            alive.setAttribute('src', './assets/icon-skull.png');
            alive.setAttribute('alt', status);
            break;
        case 'unknown':
            alive.setAttribute('src', './assets/icon-question.png');
            alive.setAttribute('alt', status);
            break;
        default:
        // Do nothing
    }
}

// Display error message in header
function displayError(error) {
    loadedCharacters.textContent = '0';
    mainCharacterHeader.innerHTML = error.message;
    mainCharacter.classList.add('display--none');
    grid.classList.add('display--none');
}

// Scroll to and display image of wanted character with star bursting effect
function displayMainCharacter() {
    window.scroll({
        top: 156,
        left: 0,
        behavior: 'smooth'
    });

    mainCharacterImage.classList.add('scale-up-animation');
    mainCharacterImage.setAttribute('src', wantedCharacter.image);
    mainCharacterImage.setAttribute('alt', wantedCharacter.name);
    starsBurstingEffect.classList.remove('display--none');
    removeEventListeners();
    setTimeout(restartQuest, AFTER_MATCH_TIME);
}

// Check whether clicked character is wanted character
function checkCharacterMatch() {
    // Here 'this' is the parent element linked to the event listener
    if (Number(this.dataset.id) === wantedCharacter.id) {
        this.classList.add('glow--right');
        displayMainCharacter();
    } else {
        this.classList.add('glow--wrong');
    }

    setTimeout(removeGlow.bind(this), GLOW_TIME);
}

function removeGlow() {
    this.classList.remove('glow--right');
    this.classList.remove('glow--wrong');
}

function removeEventListeners() {
    for (let i = 0; i < REQUESTED_CHARACTERS; i++) {
        const target = { character: document.getElementById(`character${i}`) };
        target.character.removeEventListener('click', checkCharacterMatch);
    }
}

// MAIN
restartQuest();