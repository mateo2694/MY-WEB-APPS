var playerScore = 0;
var computerScore = 0;

const moveTypes = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSORS: "scissors"
};

const possibleResults = {
    TIE: "It's a tie",
    LOSE: "You lose!",
    WIN: "You win!"
}

// Play with the selected move
function play() {
    let radios = document.getElementsByName('move-type');
    let playerMove = null;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            playerMove = radios[i].value;
        }
    }

    if (playerMove == null) {
        showAlert("Please select one move.")
    } else {
        computerMove = getRandomMove();
        let result = playWith(playerMove, computerMove);
        result == possibleResults.WIN ? playerScore++ : result == possibleResults.LOSE ? computerScore++ : null;

        // DOM manipulation
        document.querySelector('.container__input').style.display = 'none';
        document.querySelector('.container__output').style.display = 'flex';
        document.querySelector('.output__text').textContent = result;
        document.getElementById('player-img').src = `./assets/icon-${playerMove}.png`;
        document.getElementById('computer-img').src = `./assets/icon-${computerMove}.png`;
        document.getElementById('player-score').textContent = playerScore;
        document.getElementById('computer-score').textContent = computerScore;
        document.getElementById('player-move').setAttribute('class', 'output__single-move player-animation');
        document.querySelector('.output__text').setAttribute('class', 'output__text text--emphasis result-animation');
        document.querySelector('.output__button').setAttribute('class', 'output__button text--transparent button-animation');
    }
}

// Reset initial view of the game
function playAgain() {
    document.querySelector('.container__input').style.display = 'flex';
    document.querySelector('.container__output').style.display = 'none';
}

// Generate random computer move
function getRandomMove() {
    let randomIndex = Math.floor(Math.random() * 3);
    let randomMove = null;

    switch (randomIndex) {
        case 0:
            randomMove = moveTypes.ROCK;
            break;
        case 1:
            randomMove = moveTypes.PAPER;
            break;
        case 2:
            randomMove = moveTypes.SCISSORS;
            break;
        default:
            showAlert();
            break;
    }

    return randomMove;
}

// Compute result from input moves
function playWith(playerMove, computerMove) {
    let result = null;

    switch (playerMove) {
        case moveTypes.ROCK:
            if (computerMove == moveTypes.ROCK) {
                result = possibleResults.TIE;
            } else if (computerMove == moveTypes.PAPER) {
                result = possibleResults.LOSE;
            } else if (computerMove == moveTypes.SCISSORS) {
                result = possibleResults.WIN;
            }
            break;
        case moveTypes.PAPER:
            if (computerMove == moveTypes.ROCK) {
                result = possibleResults.WIN;
            } else if (computerMove == moveTypes.PAPER) {
                result = possibleResults.TIE;
            } else if (computerMove == moveTypes.SCISSORS) {
                result = possibleResults.LOSE;
            }
            break;
        case moveTypes.SCISSORS:
            if (computerMove == moveTypes.ROCK) {
                result = possibleResults.LOSE;
            } else if (computerMove == moveTypes.PAPER) {
                result = possibleResults.WIN;
            } else if (computerMove == moveTypes.SCISSORS) {
                result = possibleResults.TIE;
            }
            break;
        default:
            showAlert();
            break;
    }

    return result;
}

// Show an error message to the user
function showAlert(message = "Oops! Something went wrong, please try again.") {
    alert(message);
}