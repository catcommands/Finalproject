import React, {Component} from 'react';

class Favorite extends Component {
  render() {
    return (
      <div className="favorite">
        <a 
          href="" 
          onClick={(e) => this.onClick(this.props.currentFavUrl, e)} className="favorite-name"
        >
          {this.props.currentFavorite}
        </a>
      </div>
    );
  }
} 
export default Favorite;