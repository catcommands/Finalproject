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

  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  filterFunction() {
    var input, filter, a, i, div, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  //const App = () => (
    
  //);

render() {
const entities = positions.map((position) => { return <Entity position={position.coord} point={pointGraphics} onClick={() => this.onClick(position.url)}/>})
  console.log(entities)
  return (
    <div className="Radioplayer">
    <ReactPlayer className='react-player' url={this.state.url} controls={true} playing={true}/>
    <Viewer full={true} navigationHelpButton={false} navigationInstructionsInitiallyVisible={false} timeline={false} vrButton={false} cesium-credit-logoContainer={false} cesium-credit-textContainer={false} cesium-viewer-bottom={false}>
      <div class="dropdown">
        <button onclick="myFunction()" class="dropbtn">Dropdown</button>
        <div id="myDropdown" class="dropdown-content">
          <input type="text" placeholder="Search by name, genre, city or country" id="myInput" onkeyup="filterFunction()"/>
          <a href="#about">About</a>
          <a href="#base">Base</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
          <a href="#custom">Custom</a>
          <a href="#support">Support</a>
          <a href="#tools">Tools</a>
        </div>
      </div>
      {entities}
    </Viewer>

    <h1>STATIONS FROM API</h1>
    </div>
  );
}
}

export default hot(Radioplayer);