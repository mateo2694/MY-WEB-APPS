class CharacterFetcher {
    constructor(grid, onFetchCharacters) {
        this.API_URL = 'https://rickandmortyapi.com/api/character/';
        this.TOTAL_API_CHARACTERS = 671;
        this.GRID_GAP = 10;
        this.GRID_ROWS = 4;
        this.CELL_WIDTH = 100;
        this.gridReference = grid;
        this.onFetchCharacters = onFetchCharacters;
        this.refreshCharacters();
    }

    refreshCharacters() {
        this.gridWidth = this.gridReference.getBoundingClientRect().width;
        this.totalCharacters = Math.floor(
            (this.gridWidth + this.GRID_GAP) / (this.CELL_WIDTH + this.GRID_GAP)
        ) * this.GRID_ROWS;
        this.characters = [];
        this.wantedCharacter = {};
        this.error = null;
        this.fetchRandomIDs();
    }

    getRandomIDs() {
        let index = 1;
        let allCharactersIDs = new Array(this.TOTAL_API_CHARACTERS).fill(null).map(() => index++);
        let randomIDs = [];

        for (let i = 0; i < this.totalCharacters; i++) {
            let randomIndex = Math.floor((Math.random() * allCharactersIDs.length));
            randomIDs.push(allCharactersIDs.splice(randomIndex, 1)[0]);
        }

        this.setWantedCharacter(randomIDs);
        return randomIDs;
    }

    setWantedCharacter(randomIDs) {
        this.wantedCharacter.id = randomIDs[Math.floor((Math.random() * this.totalCharacters))];
    }

    async fetchRandomIDs() {
        const randomIDs = this.getRandomIDs();

        try {
            const response = await this.fetchCharacters(randomIDs);
            this.read(response);
        } catch (error) {
            this.error = error;
            this.liftState();
        }
    }

    async fetchCharacters(IDs) {
        try {
            const response = await fetch(this.API_URL + IDs);

            if (response.ok) {
                return response;
            } else {
                throw new Error(`The HTTP request failed - ${response.status}`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async read(response) {
        try {
            this.characters = await response.json();
            this.wantedCharacter = this.characters.find(character => {
                return character.id === this.wantedCharacter.id;
            });
        } catch (error) {
            this.error = error;
        } finally {
            this.liftState();
        }
    }

    liftState() {
        this.onFetchCharacters();
    }

    checkMatch(id) {
        return (id === this.wantedCharacter.id) ? true : false;
    }
}

export default CharacterFetcher;