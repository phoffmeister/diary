import React, { Component, Fragment } from "react";

function PhotoEntry(props) {
  return (
    <div className="card mb-1 p-2">
      <img
        className="img-fluid"
        src={"/media/" + props.photo.photo}
        alt="no photo"
      />
      {props.photo.caption}
    </div>
  );
}

export default PhotoEntry;
