import React, {Component} from 'react';

class Favorite extends Component {
  render() {
    return (
      <div className="favorite">
        <span className="favorite-name">{this.props.currentFavorite}</span>
      </div>
    );
  }
}
export default Favorite;