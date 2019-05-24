import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactPlayer from 'react-player'
import {urls} from "./urls"

class App extends Component {
  constructor (props) {
    console.log(urls)
    super(props);
    this.state = {
      url: "http://212.83.185.113/pulsAAC64.mp3",
      isLoading: false,
      stations: []
    };
  }

  onClick = evt => {
    console.log(evt.target.textContent)
    this.setState({ url: evt.target.textContent })
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    // fetch("http://www.radio-browser.info/webservice/json/stations/bycountry/Canada")
    //   .then(response => response.json())
    //   .then(data => this.setState({ stations: data, isLoading: false }));
  }

render() {
  console.log(this.state)

  return (
    <div className="App">
    <ReactPlayer className='react-player' url={this.state.url} controls={true} playing={true}/>
    <h1>STATIONS FROM API</h1>
      {urls.map(url => <div value = {url.url} onClick = {this.onClick}>{url.url}</div>)}
      {this.state.stations.map(url => <div value = {url.url} onClick = {this.onClick}>{url.url}</div>)}
    </div>
  );
}
}

export default App;

