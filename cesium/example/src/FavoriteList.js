import React, {Component} from 'react';
import Favorite from "./Favorite.js";

class FavoriteList extends Component {
  constructor (props) {
    super(props);
  }
   
  render() {
    return (
      <main className="favorites">
        { this.props.favorites.map((data) => {
            return (<Favorite
              currentFavorite={ data.content }
            />)
            } 
        )}
      </main>
    );
  }
}
export default FavoriteList;