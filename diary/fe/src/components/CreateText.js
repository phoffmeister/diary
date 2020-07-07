import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { matchPath, useHistory } from "react-router-dom";
import { getDay } from '../actions/day';
import { createText } from '../actions/text';

class CreateText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }
  componentDidMount() {
    const path = this.props.location.pathname
    const matchedPath = matchPath(path, {path:"/create/text/:id/", exact:true, strict:true});
    this.props.getDay(matchedPath.params.id);
  }

  handleClick() {
    this.props.createText({
      collection: this.props.collection.id,
      text: this.state.text,
    }, this.props.history);
  }

  render() {
    if( !this.props.collection ) {
      return <div>Loading</div>
    }
    return (
      <Fragment>
      <div className="container mt-2">
      <h1>Tell me what you did on: {this.props.collection.date}</h1>
      <textarea onChange={(e) => this.setState({text:e.target.value})} value={this.state.text} style={{width:'100%', maxWidth:'100%'}}/>
      <button className="btn btn-primary btn-sm" onClick={() => this.handleClick()}>Create</button>
      </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  collection: state.day.day,
});

export default connect(mapStateToProps, { getDay, createText })(CreateText);
