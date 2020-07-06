
import React, { Component, Fragment } from 'react';

function PhotoEntry(props) {
  return (
    <div className="card mb-1 p-2">
      <img className="img-fluid" src={'/media/'+props.photo.photo} alt="no photo"/>
      {props.photo.caption}
      </div>
  )
}

class PhotoEntries extends Component {
  render() {
    return (
      <Fragment>{this.props.photos.map((t) => <PhotoEntry key={t.id} photo={t}/>)}</Fragment>
    );
  }
}

export default PhotoEntries;
