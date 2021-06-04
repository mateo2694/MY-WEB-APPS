import React from 'react';
import './App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='App text--normal'>
        <Header serverStatus='...' characters='...' />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;