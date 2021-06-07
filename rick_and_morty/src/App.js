import React from 'react';
import './App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import CharacterFetcher from './CharacterFetcher.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickAllowed: false,
      serverStatus: '...',
      characters: [],
      wantedCharacter: null,
      isBursting: false
    };
    this.GLOW_TIME = 1000;
    this.AFTER_MATCH_TIME = 4000;
    this.error = null;
    this.onGridMount = this.onGridMount.bind(this);
    this.onFetchCharacters = this.onFetchCharacters.bind(this);
    this.onCubeClick = this.onCubeClick.bind(this);
  }

  onGridMount(grid) {
    this.fetcher = new CharacterFetcher(grid, this.onFetchCharacters);
    this.setState({
      characters: new Array(this.fetcher.totalCharacters).fill(null),
    });
  }

  onFetchCharacters() {
    let isClickAllowed = false;
    let status = 'DOWN';
    this.error = this.fetcher.error;

    if (this.error === null) {
      isClickAllowed = true;
      status = 'UP';
    }

    this.setState({
      isClickAllowed: isClickAllowed,
      serverStatus: status,
      characters: this.fetcher.characters,
      wantedCharacter: this.fetcher.wantedCharacter
    });
  }

  onCubeClick(id) {
    if (!this.state.isClickAllowed) {
      return null;
    }

    if (this.fetcher.checkMatch(id)) {
      this.setState({
        isClickAllowed: false,
        isBursting: true
      });

      window.scroll({
        top: 156,
        left: 0,
        behavior: 'smooth'
      });

      setTimeout(() => {
        this.refreshApp();
        this.fetcher.refreshCharacters();
      }, this.AFTER_MATCH_TIME);

      return 'glow--right';
    } else {
      return 'glow--wrong';
    }
  }

  refreshApp() {
    this.setState({
      characters: new Array(this.fetcher.totalCharacters).fill(null),
      wantedCharacter: null,
      isBursting: false
    });
  }

  render() {
    return (
      <div className='App text--normal'>
        <Header
          serverStatus={this.state.serverStatus}
          numberOfCharacters={this.state.characters.length} />
        <Main
          error={this.error}
          wantedCharacter={this.state.wantedCharacter}
          isBursting={this.state.isBursting}
          characters={this.state.characters}
          onGridMount={this.onGridMount}
          onCubeClick={this.onCubeClick} />
        <Footer />
      </div>
    );
  }
}

export default App;