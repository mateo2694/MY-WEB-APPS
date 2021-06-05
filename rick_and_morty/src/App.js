import React from 'react';
import './App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import CharacterFetcher from './CharacterFetcher.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.GLOW_TIME = 1000;
    this.AFTER_MATCH_TIME = 4000;
    this.states = {
      request: 0,
      guess: 1,
      display: 2,
      error: 3
    }
    this.state = {
      state: this.states.request,
      serverStatus: '...',
      characters: []
    };
    this.onGridMount = this.onGridMount.bind(this);
    this.onFetchCharacters = this.onFetchCharacters.bind(this);
  }

  onFetchCharacters() {
    let state = this.states.error;
    let status = 'DOWN';

    if (this.fetcher.error === null) {
      state = this.states.guess;
      status = 'UP';
    }

    this.setState({
      state: state,
      serverStatus: status,
      characters: this.fetcher.characters
    });
  }

  onGridMount(grid) {
    this.fetcher = new CharacterFetcher(grid, this.onFetchCharacters);
    this.setState({
      characters: new Array(this.fetcher.TOTAL_CHARACTERS).fill(null)
    });
  }

  render() {
    return (
      <div className='App text--normal'>
        <Header serverStatus={this.state.serverStatus} characters={this.state.characters.length} />
        <Main characters={this.state.characters} onGridMount={this.onGridMount} />
        <Footer />
      </div>
    );
  }
}

export default App;