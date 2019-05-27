import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import { hot } from "react-hot-loader/root";


import { Viewer, Entity } from "resium";
import { Cartesian3 } from "cesium";
import {urls} from "./urls"

const pointGraphics = { pixelSize: 10 };
const positions = urls.map((url) => {
  // TODO: instead of returning [Cartesian, Cartesian, etc.]
  // return [{ coord: Cartesian, url: url }, { coord: Cartesian, url: url }, etc.]
  // {coord: Cartesian3.fromDegrees(Number(url.lng), Number(url.lat), 100), url: url}

  return {coord: Cartesian3.fromDegrees(Number(url.lng), Number(url.lat), 100), url:url}
})
console.log(positions)
class Radioplayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      url: "",
      coords: positions,
      isLoading: false,
      stations: []
    };
  }
  onClick = evt => {
    // console.log("the event is:", evt)
    this.setState({ url: evt.url})
  }

  componentDidMount() {
    this.setState({ isLoading: true });
  }


  //const App = () => (
    
  //);

render() {
const entities = positions.map((position) => { return <Entity position={position.coord} point={pointGraphics} onClick={() => this.onClick(position.url)}/>})
  console.log(entities)
  return (
    <div className="Radioplayer">
    <ReactPlayer className='react-player' url={this.state.url} controls={true} playing={true}/>
    <Viewer full={true} navigationHelpButton={false} navigationInstructionsInitiallyVisible={false} timeline={false} vrButton={false} animation={false}>
      {entities}
    </Viewer>
    <input type="search" id="site-search" placeholder="Search by name, call sign, genre, city or country" name="q" aria-label="Search through site content"></input>
<button>Search</button>
    <h1>STATIONS FROM API</h1>
    </div>
  );
}
}

export default hot(Radioplayer);