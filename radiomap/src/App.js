import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactPlayer from 'react-player'

function App() {
  return (
    <div className="App">
    <ReactPlayer url="http://212.83.185.113/pulsAAC64.mp3" controls={true} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
