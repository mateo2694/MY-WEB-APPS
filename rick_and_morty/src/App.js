import React from 'react';
import './App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import CharacterFetcher from './CharacterFetcher.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.states = {
      request: 0,
      guess: 1,
      display: 2
    }
    this.state = {
      state: this.states.request,
      serverStatus: '...',
      characters: '...'
    };
    this.onGridMount = this.onGridMount.bind(this);
  }

  onGridMount(grid) {
    this.fetcher = new CharacterFetcher(grid);
  }

  render() {
    return (
      <div className='App text--normal'>
        <Header serverStatus={this.state.serverStatus} characters={this.state.characters} />
        <Main onGridMount={this.onGridMount} />
        <Footer />
      </div>
    );
  }
}

export default App;