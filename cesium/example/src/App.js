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
      muted: false,
      url: "",
      coords: positions,
      isLoading: false,
      stations: [],
      showSearch:false,
      favorites: [],
      showFavorites: false,
      currentStation: {name: ""},
      isHoveringSound: false,
      isHoveringFavorite: false,
      isHoveringFavList: false,
      isHoveringSearchBtn:false,
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
    // console.log("the data is:", data)
    this.setState({ url: data.url, currentStation: data, showSearch: false})
    //this.toggleSearchList();
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    const favorites = localStorage.getItem('favorites')

    if (favorites) {
      this.setState({favorites: JSON.parse(favorites)})
    }
  }


  favoritesHandler = (e) => {
    e.preventDefault()

    const favorites = JSON.parse(localStorage.getItem('favorites'))

    if (favorites) { 
      favorites.push(this.state.currentStation)
      localStorage.setItem("favorites", JSON.stringify(favorites))
    } else {
      localStorage.setItem("favorites", JSON.stringify([this.state.currentStation]))
    }
    this.setState({ 
      favorites: [...this.state.favorites, this.state.currentStation]
    })
  }
 
  broadcastHandler = (e) => {
    e.preventDefault()
    this.setState({muted: !this.state.muted})
  }

  toggleFavorites = (e) => {
    e.preventDefault()
    this.setState({showFavorites: !this.state.showFavorites})
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
  
  // Resets the localStorage to an empty object, eliminating all items on it
// clearFavorites = (e) => {
//   e.preventDefault()
//   localStorage.setItem('favorites', 'null');
//   this.state.favorites = [];
// }

handleMouseHoverSound = (e) =>  {
  e.preventDefault()
  this.setState(this.toggleHoverStateSound);
}

toggleHoverStateSound = () => {
  if (!this.state.isHoveringSound)
        this.setState({isHoveringSound: true})
      else
        this.setState({isHoveringSound: false})
}

handleMouseHoverFavorite = (e) =>  {
  e.preventDefault()
  this.setState(this.toggleHoverStateFavorite);
}

toggleHoverStateFavorite = () => {
  if (!this.state.isHoveringFavorite)
        this.setState({isHoveringFavorite: true})
      else
        this.setState({isHoveringFavorite: false})
}

handleMouseHoverFavList = (e) =>  {
  e.preventDefault()
  this.setState(this.toggleHoverStateFavList);
}

toggleHoverStateFavList = () => {
  if (!this.state.isHoveringFavList)
        this.setState({isHoveringFavList: true})
      else
        this.setState({isHoveringFavList: false})
}

handleMouseHoverSearchBtn = (e) =>  {
  e.preventDefault()
  this.setState(this.toggleHoverStateSearchBtn);
}

toggleHoverStateSearchBtn = () => {
  if (!this.state.isHoveringSearchBtn)
        this.setState({isHoveringSearchBtn: true})
      else
        this.setState({isHoveringSearchBtn: false})
}

render() {
  const entities = positions.map((position, i) => { 
    return <Entity key={i} position={position.coord} point={pointGraphics} onClick={() => this.onClick(position.url)}/>
  })
    // console.log("Entities:", entities)
    // TODO: make a const that loops through the urls
    // and returns an a tag <a href="">{url.name}</a>
    // for each url
  const options = searchOptions.map((element, i) => {
    // console.log("Element is:", element)
    return <a key={i} href="" onClick={(e) => this.onClick(element, e)}>{element.name} {element.country} {element.city} {element.language}  {element.genre} </a>
  })
  // console.log("options:", options)

  const favList = this.state.favorites.map((element, i) => {
    // console.log("Element is:", element)
    return <a key={i} href="" onClick={(e) => this.onClick(element, e)}>{element.name}  </a>
  })
  return (
    <div className="Radioplayer">
    <ReactPlayer 
      muted={this.state.muted} 
      className='react-player' 
      url={this.state.url} 
      controls={true} 
      playing={true}
    />

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
        
        <i 
        onClick={() => this.toggleSearchList()} 
        id="dropbtn" 
        className="cesium-button cesium-toolbar-button fab fa-searchengin"
        onMouseEnter={this.handleMouseHoverSearchBtn}
        onMouseLeave={this.handleMouseHoverSearchBtn}></i>
        {this.state.isHoveringSearchBtn && <div id="dropbtn-hover">Search radio stations</div>}
        
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
      
      {entities}
        <div 
          className="cesium-button cesium-toolbar-button fav-btn" 
          onClick={this.favoritesHandler}
          onMouseEnter={this.handleMouseHoverFavorite}
          onMouseLeave={this.handleMouseHoverFavorite}>
          <i className="far fa-heart"></i>
        </div>
          {this.state.isHoveringFavorite && <div id="fav-hover">Add Favorite</div>}
        <div 
          className="cesium-button cesium-toolbar-button list-btn" 
          onClick={this.toggleFavorites}
          onMouseEnter={this.handleMouseHoverFavList}
          onMouseLeave={this.handleMouseHoverFavList}>
          <i className="fas fa-list"></i>
        </div>
        {this.state.isHoveringFavList && <div id="favList-hover">Show Favorites</div>}

        <div className="cesium-button cesium-toolbar-button zoomin-btn">
          <i class="fas fa-search-plus"></i>
        </div>

        <div className="cesium-button cesium-toolbar-button zoomout-btn">
          <i class="fas fa-search-minus"></i>
        </div>

        <div 
          className="cesium-button cesium-toolbar-button broadcast-btn" 
          onClick={this.broadcastHandler}
          onMouseEnter={this.handleMouseHoverSound}
          onMouseLeave={this.handleMouseHoverSound}>
          <i className="fas fa-broadcast-tower"></i>
        </div >
        {this.state.isHoveringSound && <div id="broadcast-hover">Sound On/Off</div>}

        {this.state.showFavorites && 
        <div className="favorites">
          {favList}
          {/* <div className="clearFav-btn" onClick={this.clearFavorites}>
              <i class="fas fa-minus-circle"></i>
          </div> */}
        </div>
        // <FavoriteList className="favorites" favorites={this.state.favorites} />
          // <div className="favorites">
          //     {this.state.favorites.map((favorite) =>
          //     <ul>
          //       <li key={favorite.name}>{favorite.name}</li>  
          //     </ul>
          //     )
          //     }
          //     <div className="clearFav-btn" onClick={this.clearFavorites}>
          //         <i class="fas fa-minus-circle"></i>
          //     </div>
          // </div>
        }

        <div className="currentStation">
          {this.state.currentStation.name}
        </div>
  
    </Viewer>

    <h1>STATIONS FROM API</h1>
    </div>
  );
}
}

export default hot(Radioplayer);


