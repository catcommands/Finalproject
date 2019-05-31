import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import { hot } from "react-hot-loader/root";
import "./App.css";
import FavoriteList from "./FavoriteList.js";
import { Viewer, Entity } from "resium";
import { Cartesian3, Color } from "cesium";
import {urls} from "./urls"


const pointGraphics = { pixelSize: 4, 
  color: Color.YELLOWGREEN};
const positions = urls.map((url) => {
  return {coord: Cartesian3.fromDegrees(Number(url.longitude), Number(url.latitude), 100), url:url}
})

const searchOptions = urls.map((option) => {
  return {name: option.name, genre: option.tags, city: option.state, country: option.country, url: option.url, lng: option.longitude, lat: option.latitude}

})
console.log("searchOptions object: ", searchOptions)
class Radioplayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      url: "",
      coords: positions,
      isLoading: false,
      stations: [],
      showSearch:false,
      favorites: [],
      currentStation: null,
    };
  }
  onClick = (data, e) => {
    if (e) {
      e.preventDefault()
    }
    
    // var x = document.getElementsByClassName("cesium-viewer-toolbar")[0].firstChild.firstChild.firstChild; 
    // x.focus()
    // x.keepExpanded = true;
    // x.value = `${data.longitude}, ${data.latitude}`
    var txtbox = document.getElementsByClassName("cesium-geocoder-searchButton")[0]
    txtbox.click()
    console.log("the data is:", data)
    this.setState({ url: data.url, currentStation: data, showSearch: false})
    //this.toggleSearchList();
  }



  componentDidMount() {
    this.setState({ isLoading: true });
  }

  favoritesHandler = (data, e) => {
    if (e) {
      e.preventDefault()
    }
    console.log("the data is:", data)
    this.setState({ favorites: this.state.favorites})
    console.log("favorites: ", this.state.favorites);
  }

 
  toggleSearchList() {
      if (!this.state.showSearch)
        this.setState({showSearch: true})
      else
        this.setState({showSearch: false})

  
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

clearFavCart(){
  localStorage.setItem('favorites', null);
  this.state.favorites = [];
  window.location.reload();
}

render() {
  console.log("localstorage is:", localStorage)
  localStorage.setItem("favorites", JSON.stringify([]))

const entities = positions.map((position, i) => { 
  return <Entity key={i} position={position.coord} point={pointGraphics} onClick={() => this.onClick(position.url)}/>
})
  console.log("Entities:", entities)
const options = searchOptions.map((element, i) => {
  console.log("Element is:", element)
  return <a key={i} href="" onClick={(e) => this.onClick(element, e)}>{element.name} {element.country} {element.city} {element.language}  {element.genre} </a>
})
console.log("options:", options)

  return (
    <div className="Radioplayer">
    <ReactPlayer className='react-player' url={this.state.url} controls={true} playing={true}/>

    <Viewer 
    pointGraphics = {{ pixelSize: 2,
    color: Color.yellogreen
    }}
    full={true}
    token={process.env.REACT_APP_CTOKEN}
    navigationHelpButton={false}
    selectionIndicator={false}
    navigationInstructionsInitiallyVisible={false}
    timeline={false}
    vrButton={false}
    cesium-credit-logoContainer={false}
    cesium-credit-textContainer={false}
    cesium-viewer-bottom={false}
    >

      <div className="searchbar">
        
        <i onClick={() => this.toggleSearchList()} id="dropbtn" className="fab fa-searchengin"></i>
        { this.state.showSearch &&
        <div id="myDropdown" className="dropdown-content">
          <input type="text" placeholder="Search by name, genre, city or country" id="myInput" autocomplete="off" onKeyUp={() => this.filterFunction()} />
          <i onClick= {() => this.toggleSearchList()} className="fas fa-times"></i>
          <div className="options">
          {options}
          </div>
        </div>
        }
      </div>
      
      <FavoriteList favorites={this.state.favorites} />

      {entities}
        <div className="fav-btn">
          <i onClick={() => this.favoritesHandler()} className="far fa-heart"></i>
        </div>

        <div className="list-btn">
          <i className="fas fa-list"></i>
        </div>

        <div className="zoomin-btn">
          <i class="fas fa-search-plus"></i>
        </div>

        <div className="zoomout-btn">
          <i class="fas fa-search-minus"></i>
        </div>

        <div className="broadcast-btn">
          <i className="fas fa-broadcast-tower"></i>
        </div>
  
    </Viewer>

    <h1>STATIONS FROM API</h1>
    </div>
  );
}
}

export default hot(Radioplayer);


