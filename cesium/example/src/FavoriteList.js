import React, {Component} from 'react';
import Favorite from "./Favorite.js";

class FavoriteList extends Component {
  constructor (props) {
    super(props);
  }
   
  render() {
    return (
      <main className="favorites">
        { this.props.favorites.map((favorite) => {
            return (<Favorite
              currentFavorite={ favorite.name }
              currentFavUrl={ favorite.url }
            />)
            } 
        )}
      </main>
    );
  }
}
export default FavoriteList;