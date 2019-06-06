import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import { hot } from "react-hot-loader/root";
import "./App.css";
import { Camera, Viewer, Entity, Scene, ScreenSpaceCameraController } from "resium";
import { Camera as Cam, Cartesian3, Color} from "cesium";
import {urls} from "./urls"

const pointGraphics = { pixelSize: 6, 
  color: Color.LAWNGREEN};
const positions = urls.map((url) => {
  return {coord: Cartesian3.fromDegrees(Number(url.longitude), Number(url.latitude), 100), url:url}
})

const searchOptions = urls.map((option) => {
  return {name: option.name, genre: option.tags, city: option.state, country: option.country, url: option.url, lng: option.longitude, lat: option.latitude}

})
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
      isHoveringRemoveFavorite: false,
      isHoveringFavList: false,
      isHoveringSearchBtn:false,
      showOverlay: true
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
      const favoritesWithStation = favorites.filter((fav) => fav.id !== this.state.currentStation.id)
      favoritesWithStation.push(this.state.currentStation)
      localStorage.setItem("favorites", JSON.stringify(favoritesWithStation))
    } else {
      localStorage.setItem("favorites", JSON.stringify([this.state.currentStation]))
    }

    const favoritesWithStation = this.state.favorites.filter((fav) => fav.id !== this.state.currentStation.id)
    this.setState({ 
      favorites: [...favoritesWithStation, this.state.currentStation]
    })
  }

  removeFavoritesHandler = (e) => {
    e.preventDefault()
    const station = this.state.currentStation;
    if (station) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const favoritesWithStationRemoved = favorites.filter((fav) => fav.id !== station.id)
      localStorage.setItem('favorites', JSON.stringify(favoritesWithStationRemoved));
      this.setState({ favorites: favoritesWithStationRemoved });
    }
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

handleMouseHoverRemoveFavorite = (e) =>  {
  e.preventDefault()
  this.setState(this.toggleHoverStateRemoveFavorite);
}

toggleHoverStateRemoveFavorite = () => {
  if (!this.state.isHoveringRemoveFavorite)
        this.setState({isHoveringRemoveFavorite: true})
      else
        this.setState({isHoveringRemoveFavorite: false})
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

removeOverlay = () => {
  this.setState({
    showOverlay: false,
  });
}

zoomIn = () => {
  // Explicitly zoom-in using the raw DOM API
  // We're accessing "current" to get the DOM node
  this.camera.current.cesiumElement.zoomIn(1000000);
}

zoomOut = () => {
  this.camera.current.cesiumElement.zoomOut(1000000);
}

camera = React.createRef()

render() {
  const entities = positions.map((position, i) => { 
    return <Entity key={i} position={position.coord} point={pointGraphics} onClick={() => this.onClick(position.url)}/>
  })

  const options = searchOptions.map((element, i) => {

    return <a key={i} href="" onClick={(e) => this.onClick(element, e)}>{element.name} {element.country} {element.city} {element.language} {element.genre} </a>
  })

  const favList = this.state.favorites.map((element, i) => {
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
      {
        this.state.showOverlay
        ? <div className="overlay" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '', zIndex: 9 }}>
            <h1>ᚱΔDIO ᚹLΔNET</h1>
            
            <button className="enter-button" onClick={this.removeOverlay}>Connect Me to the World!</button>
            <img src="/rotatglob.gif"></img>
          </div>
        : null 
      }

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

    <Scene />
    <ScreenSpaceCameraController
    enableTranslate={false}
    minimumZoomDistance={10000}
    maximumZoomDistance={100000000}
    />
    <Camera
    maximumZoomFactor={0.05}
    ref={this.camera}
    />

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
        },
      </div>

      {entities}
        <div 
          className="cesium-button cesium-toolbar-button fav-btn" 
          onClick={this.favoritesHandler}
          onMouseEnter={this.handleMouseHoverFavorite}
          onMouseLeave={this.handleMouseHoverFavorite}>
          <i className="fas fa-heart"></i>
        </div>
          {this.state.isHoveringFavorite && <div id="fav-hover">Add Favorite</div>}

          <div 
          className="cesium-button cesium-toolbar-button removeFav-btn" 
          onClick={this.removeFavoritesHandler}
          onMouseEnter={this.handleMouseHoverRemoveFavorite}
          onMouseLeave={this.handleMouseHoverRemoveFavorite}>
          <i className="far fa-heart"></i>
        </div>
          {this.state.isHoveringRemoveFavorite && <div id="removeFav-hover">Remove Favorite</div>}

        <div 
          className="cesium-button cesium-toolbar-button list-btn" 
          onClick={this.toggleFavorites}
          onMouseEnter={this.handleMouseHoverFavList}
          onMouseLeave={this.handleMouseHoverFavList}>
          <i className="fas fa-list"></i>
        </div>
        {this.state.isHoveringFavList && <div id="favList-hover">Show Favorites</div>}

        <div onClick={this.zoomIn} className="cesium-button cesium-toolbar-button zoomin-btn">
          <i class="fas fa-search-plus"></i>
        </div>

        <div onClick={this.zoomOut} className="cesium-button cesium-toolbar-button zoomout-btn">
          <i class="fas fa-search-minus"></i>
        </div>

        <div 
          className="cesium-button cesium-toolbar-button broadcast-btn" 
          onClick={this.broadcastHandler}
          onMouseEnter={this.handleMouseHoverSound}
          onMouseLeave={this.handleMouseHoverSound}>
          <i className="fas fa-broadcast-tower"></i>
        </div>
        {this.state.isHoveringSound && <div id="broadcast-hover">Sound On/Off</div>}

        {this.state.showFavorites && 
          <div className="favorites">
            {favList}
          </div>
        }

          <div className="currentStation">
        Current Station: {this.state.currentStation.name}
          </div>
      </Viewer>
    </div>
  );
}
}

export default hot(Radioplayer);