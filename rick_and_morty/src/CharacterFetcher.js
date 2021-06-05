class CharacterFetcher {
    constructor(grid) {
        this.API_URL = 'https://rickandmortyapi.com/api/character/';
        this.TOTAL_API_CHARACTERS = 671;
        this.GRID_WIDTH = grid.getBoundingClientRect().width;
        this.GRID_GAP = 10;
        this.GRID_ROWS = 4;
        this.CELL_WIDTH = 100;
        this.TOTAL_CHARACTERS = Math.floor(
            (this.GRID_WIDTH + this.GRID_GAP) / (this.CELL_WIDTH + this.GRID_GAP)
        ) * this.GRID_ROWS;
        this.SHOW_INTERVAL = 50;
        this.GLOW_TIME = 1000;
        this.AFTER_MATCH_TIME = 3000;
        this.wantedCharacter = {};
        this.fetchRandomIDs();
    }

    getRandomIDs() {
        let index = 1;
        let allCharactersIDs = new Array(this.TOTAL_API_CHARACTERS).fill(null).map(() => index++);
        let randomIDs = [];

        for (let i = 0; i < this.TOTAL_CHARACTERS; i++) {
            let randomIndex = Math.floor((Math.random() * allCharactersIDs.length));
            randomIDs.push(allCharactersIDs.splice(randomIndex, 1)[0]);
        }

        this.setWantedCharacter(randomIDs);
        return randomIDs;
    }

    setWantedCharacter(randomIDs) {
        this.wantedCharacter.id = randomIDs[Math.floor((Math.random() * this.TOTAL_CHARACTERS))];
    }

    async fetchRandomIDs() {
        const randomIDs = this.getRandomIDs();

        try {
            const response = await this.fetchCharacters(randomIDs);
            console.log(response);
            this.onFetchCharacters(response);
        } catch (error) {
            //lift_status -> error
        }
    }

    async fetchCharacters(IDs) {
        try {
            const response = await fetch(this.API_URL + IDs);
            return (response.ok) ? response : new Error(`The HTTP request failed - ${response.status}`);
        } catch (error) {
            return new Error('The API server is not responding');
        }
    }
}

export default CharacterFetcher;