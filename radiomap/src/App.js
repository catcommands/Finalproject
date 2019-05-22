import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactPlayer from 'react-player'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      url: "http://212.83.185.113/pulsAAC64.mp3",
      isLoading: false,
      stations: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://www.radio-browser.info/webservice/json/stations/bycountry/Canada")
      .then(response => response.json())
      .then(data => this.setState({ stations: data, isLoading: false }));
  }

render() {
  console.log(this.state)

  return (
    <div className="App">
    <ReactPlayer url={this.state.url} controls={true} />
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
}

export default App;
