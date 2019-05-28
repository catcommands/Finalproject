import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import { hot } from "react-hot-loader/root";
import "./App.css";

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

const searchOptions = urls.map((option) => {
  return {name: option.name, genre: option.tags, city: option.state, country: option.country, url: option.url}
})

//const Credit = () => <div>Hello</div>
class Radioplayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      url: "",
      coords: positions,
      isLoading: false,
      stations: [],
    };
  }
  onClick = (url, e) => {
    if (e) {
      e.preventDefault()
    }
    
    console.log("the url is:",url)
    this.setState({ url: url})
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
const entities = positions.map((position, i) => { 
  return <Entity key={i} position={position.coord} point={pointGraphics} onClick={() => this.onClick(position.url.url)}/>
})
  console.log(entities)
  // TODO: make a const that loops through the urls
  // and returns an a tag <a href="">{url.name}</a>
  // for each url
const options = searchOptions.map((element, i) => {
  console.log("Eelement is:", element)
  return <a key={i} href="" onClick={(e) => this.onClick(element.url, e)}>{element.name}</a>
})

//Cesium.IonImageryProvider.defaultAccessToken = process.env.REACT_APP_CTOKEN
  return (
    <div className="Radioplayer">
    <ReactPlayer className='react-player' url={this.state.url} controls={true} playing={true}/>

    <Viewer 
    full={true}
    token={process.env.REACT_APP_CTOKEN}
    navigationHelpButton={false}
    selectionIndicator={false}
    navigationInstructionsInitiallyVisible={false}
    timeline={false}
    vrButton={false}
    cesium-credit-logoContainer={false}
    cesium-credit-textContainer={false}
    cesium-viewer-bottom={false}>
      <div className="searchbar">
        <button onClick={() => this.myFunction()} className="dropbtn">Dropdown</button>
        <div id="myDropdown" className="dropdown-content">
          <input type="text" placeholder="Search by name, genre, city or country" id="myInput" onKeyUp={() => this.filterFunction()}/>
          {options}
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