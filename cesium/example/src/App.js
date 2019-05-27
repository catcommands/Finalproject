import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import { hot } from "react-hot-loader/root";


import { Viewer, Entity } from "resium";
import { Cartesian3 } from "cesium";
import {urls} from "./urls"

// Loop through urls
// for each url
// call Cartesian3.fromDegrees with url lng and url lat
const lat = Number(urls[1].lat)
const lng = Number(urls[1].lng)

const position = Cartesian3.fromDegrees(lng, lat, 100);
const pointGraphics = { pixelSize: 10 };

class Radioplayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      url: "",
      coords: position,
      isLoading: false,
      stations: []
    };
  }
  onClick = evt => {
    //console.log(evt.target.textContent)
    this.setState({ url: "http://46.105.126.68:7304/;stream.mp3"})
  }

  componentDidMount() {
    this.setState({ isLoading: true });
  }


  //const App = () => (
    
  //);

render() {
  console.log(this.state)
  return (
    <div className="Radioplayer">
    <ReactPlayer className='react-player' url={this.state.url} controls={true} playing={true}/>
    <Viewer full={true} navigationHelpButton={false} navigationInstructionsInitiallyVisible={false} timeline={false} vrButton={false} animation={false}>
      <Entity position={position} point={pointGraphics} onClick={this.onClick}/>
    </Viewer>
    <input type="search" id="site-search" placeholder="Search by name, call sign, genre, city or country" name="q" aria-label="Search through site content"></input>
<button>Search</button>
    <h1>STATIONS FROM API</h1>
    </div>
  );
}
}

export default hot(Radioplayer);