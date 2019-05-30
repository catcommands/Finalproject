import React, {Component} from 'react';

class Favorite extends Component {
  render() {
    return (
      <div className="favorite">
        <span className="favorite-name">{this.props.favName}</span>
      </div>
    );
  }
}
export default Favorite;