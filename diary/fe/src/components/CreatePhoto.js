import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { matchPath } from "react-router-dom";
import { getDay } from '../actions/day';
import { createPhoto } from '../actions/photo';

class CreatePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
    };
  }
  componentDidMount() {
    const path = this.props.location.pathname
    const matchedPath = matchPath(path, {path:"/create/photo/:id/", exact:true, strict:true});
    this.props.getDay(matchedPath.params.id);
  }

  handleSubmit(event) {
    const formData = new FormData();
    formData.append('photo', this.state.photo);
    formData.append('collection', this.props.collection.id);
    this.props.createPhoto(formData, this.props.history);
    event.preventDefault();
  }

  handleChange = event => {
    this.setState({
      photo: event.target.files[0],
    });
  }

  render() {
    if( !this.props.collection ) {
      return <div>Loading</div>
    }
    return (
      <Fragment>
      <div className="container mt-2">
      <h1>Show me what you did on: {this.props.collection.date}</h1>
      <form onSubmit={(e) => this.handleSubmit(e)}>
      <input
        type="file"
        name="photos"
        onChange={(e) => this.handleChange(e)}
        alt="image"
      />
      <button className="btn btn-primary btn-sm" type="submit" >Create</button>
      </form>
      </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  collection: state.day.day,
});

export default connect(mapStateToProps, { getDay, createPhoto })(CreatePhoto);
