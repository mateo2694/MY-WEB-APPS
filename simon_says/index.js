// DOM object references
const gameboard = document.getElementById('gameboard');
const blue = document.getElementById('blue');
const purple = document.getElementById('purple');
const orange = document.getElementById('orange');
const green = document.getElementById('green');
const button = document.getElementById('button');
const textStart = document.getElementById('textStart');
const textWin = document.getElementById('textWin');
const textLose = document.getElementById('textLose');
const textPlayAgain = document.getElementById('textPlayAgain');
const levelIndicator = document.getElementById('levelIndicator');

// Game parameters
const LAST_LEVEL = 12;
const TIMEOUT_SEQUENCE = 350;
const DELAY_SEQUENCE = 200;
const TIMEOUT_PLAYER = 200;
const DELAY_PLAYER = 10;
const TIMEOUT_LEVEL = 500;

class Game {
    constructor() {
        this.initialize();
        this.generateSequence();
        this.numbersToColors();
        this.initGame();
    }

    initialize() {
        this.level = 1;
        this.sequenceIndex = 0;
        this.colors = { blue, purple, orange, green };
        this.handlePlayerColor = this.handlePlayerColor.bind(this);
        button.classList.add('hidden');
        button.classList.remove('won');
        button.classList.remove('lost');
        textStart.classList.add('text--hidden');
        textWin.classList.add('text--hidden');
        textLose.classList.add('text--hidden');
        levelIndicator.classList.remove('hidden');
        levelIndicator.textContent = this.level;
        gameboard.classList.add('gameboard-animation');
    }

    generateSequence() {
        this.randomSequence = new Array(LAST_LEVEL).fill(0).map(() => Math.floor(Math.random() * 4));
    }

    numbersToColors() {
        this.randomColors = this.randomSequence.map((number) => {
            switch (number) {
                case 0:
                    return this.colors.blue;
                case 1:
                    return this.colors.purple;
                case 2:
                    return this.colors.orange;
                case 3:
                    return this.colors.green;
                default:
                    return null;
            }
        });
    }

    colorToNumber(color) {
        switch (color) {
            case 'blue':
                return 0;
            case 'purple':
                return 1;
            case 'orange':
                return 2;
            case 'green':
                return 3;
            default:
                return null;
        }
    }

    async initGame() {
        await this.showSequence();
        this.addEventListeners();
    }

    showSequence() {
        return new Promise(async resolve => {
            for (let i = 0; i < this.level; i++) {
                await this.lightUp(this.randomColors[i], DELAY_SEQUENCE);
                await this.lightDown(this.randomColors[i], TIMEOUT_SEQUENCE);
            }
            resolve();
        });
    }

    async handlePlayerColor({ target }) {
        this.removeEventListeners();
        await this.lightUpPlayerColor(target);
        let number = this.colorToNumber(target.dataset.color);

        if (number === this.randomSequence[this.sequenceIndex]) {
            this.sequenceIndex++;

            if (this.sequenceIndex === this.level) {
                await this.lightUpLevelIndicator(true);

                if (this.level < LAST_LEVEL) {
                    this.level++;
                    this.sequenceIndex = 0;
                    levelIndicator.textContent = this.level;
                    this.initGame();
                } else {
                    this.endGame(true)
                }
            } else {
                this.addEventListeners();
            }
        } else {
            await this.lightUpLevelIndicator(false);
            this.endGame(false);
        }
    }

    addEventListeners() {
        for (let color in this.colors) {
            this.colors[color].classList.add('pointer');
            this.colors[color].addEventListener('click', this.handlePlayerColor);
        }
    }

    removeEventListeners() {
        for (let color in this.colors) {
            this.colors[color].classList.remove('pointer');
            this.colors[color].removeEventListener('click', this.handlePlayerColor);
        }
    }

    lightUp(color, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                color.classList.add('light');
                gameboard.classList.add('border--highlight', color.dataset.color);
                resolve();
            }, delay);
        });
    }

    lightDown(color, timeout) {
        return new Promise(resolve => {
            setTimeout(() => {
                color.classList.remove('light');
                gameboard.classList.remove('border--highlight', color.dataset.color);
                resolve();
            }, timeout);
        });
    }

    lightUpPlayerColor(color) {
        return new Promise(async resolve => {
            await this.lightUp(color, DELAY_PLAYER);
            await this.lightDown(color, TIMEOUT_PLAYER);
            resolve();
        });
    }

    lightUpLevelIndicator(isPassed) {
        return new Promise(resolve => {
            let levelResult = isPassed ? 'passed' : 'failed';
            levelIndicator.classList.add(levelResult);

            setTimeout(() => {
                levelIndicator.classList.remove(levelResult);
                resolve();
            }, TIMEOUT_LEVEL);
        });
    }

    endGame(isWinner) {
        let gameResult = isWinner ? 'won' : 'lost';
        let displayText = isWinner ? textWin : textLose;
        this.level = 1;
        this.sequenceIndex = 0;
        button.classList.remove('hidden');
        button.classList.add(gameResult);
        displayText.classList.remove('text--hidden');
        textPlayAgain.classList.remove('text--hidden');
        levelIndicator.classList.add('hidden');
        gameboard.classList.remove('gameboard-animation');
    }
}

function startNewGame() {
    new Game();
}