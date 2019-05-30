import React, {Component} from 'react';
import ReactPlayer from 'react-player'
// import Select from 'react-select';
import { hot } from "react-hot-loader/root";
import "./App.css";

import { Viewer, Entity } from "resium";
import { Cartesian3 } from "cesium";
import {urls} from "./urls"

// import Scrollbar from 'react-scrollbar';
// var ScrollArea = require('react-scrollbar');

const pointGraphics = { pixelSize: 10 };
const positions = urls.map((url) => {
  // TODO: instead of returning [Cartesian, Cartesian, etc.]
  // return [{ coord: Cartesian, url: url }, { coord: Cartesian, url: url }, etc.]
  // {coord: Cartesian3.fromDegrees(Number(url.lng), Number(url.lat), 100), url: url}

  return {coord: Cartesian3.fromDegrees(Number(url.lng), Number(url.lat), 100), url:url}
})
// console.log(positions)

const searchOptions = urls.map((option) => {
  return {name: option.name, genre: option.tags, city: option.state, country: option.country, language: option.language, url: option.url, lng: option.lng, lat: option.lat}
})
console.log("searchOptions object: ", searchOptions)

//const Credit = () => <div>Hello</div>
class Radioplayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      url: "",
      coords: positions,
      isLoading: false,
      stations: [],
      showSearch:false,
    };
  }
  onClick = (data, e) => {
    if (e) {
      e.preventDefault()
    }
    var x = document.getElementsByClassName("cesium-viewer-toolbar")[0].firstChild.firstChild.firstChild; 
    x.focus()
    x.keepExpanded = true;
    x.value = `${data.lng}, ${data.lat}`
    var txtbox = document.getElementsByClassName("cesium-geocoder-searchButton")[0]
    txtbox.click()
    // console.log("the url is:", data)
    this.setState({ url: data.url})
    this.toggleSearchList();
  }


  componentDidMount() {
    this.setState({ isLoading: true });

    // if (localStorage.getItem('favCart') !== null) {
    //   favCart = JSON.parse(localStorage.getItem('favCart'))
    // }

  }

  toggleSearchList() {
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

  

  
  // Resets the localStorage to an empty object, eliminating all items on it
// clearFavCart(){
//   localStorage.setItem('favCart', null);
//   favoriteCart = {};
//   window.location.reload();
// }

// Save the favoriteCart info when the user close the window
// window.addEventListener('beforeunload', (event) => {
//   localStorage.setItem('favCart', null);
//   localStorage.setItem('favCart', JSON.stringify(cart));
// });


render() {
  console.log("localstorage is:", localStorage)
  localStorage.setItem("favCart", JSON.stringify([]))

const entities = positions.map((position, i) => { 
  return <Entity key={i} position={position.coord} point={pointGraphics} onClick={() => this.onClick(position.url)}/>
})
  console.log("Entities:", entities)
  // TODO: make a const that loops through the urls
  // and returns an a tag <a href="">{url.name}</a>
  // for each url
const options = searchOptions.map((element, i) => {
  console.log("Element is:", element)
  return <a key={i} href="" onClick={(e) => this.onClick(element, e)}>{element.name} {element.country} {element.city} {element.language}  {element.genre} </a>
})
console.log("options:", options)

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

      {/* <Select
        value={options}
        onChange={() => this.showSearchList()}
        options={searchOptions}
      /> */}

      <div className="searchbar">
        <button onClick={() => this.toggleSearchList()} className="dropbtn">Search radio stations</button>
        <div id="myDropdown" className="dropdown-content">
          <input type="text" placeholder="Search by name, genre, city or country" id="myInput" onKeyUp={() => this.filterFunction()} onClick= {() => document.getElementById("myDropdown").classList.toggle("show")} />
          {options}
        </div>
      </div>

      {/* <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="content"
            horizontal={false}
            >
            <div>Some long content.</div>
          </ScrollArea> */}

      

        
      {entities}
        <div className="fav-btn">
          <i onClick={null} className="far fa-heart"></i>
        </div>
        
    </Viewer>

    <h1>STATIONS FROM API</h1>
    </div>
  );
}
}

export default hot(Radioplayer);