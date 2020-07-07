import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDay } from '../actions/day'
import { matchPath, Link } from "react-router-dom";
import TextEntries from './TextEntries';
import DrinkEntries from './DrinkEntries';
import PhotoEntries from './PhotoEntries';
import MedicationEntries from './MedicationEntries';

class Day extends Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const path = this.props.location.pathname
    const day = matchPath(path, {path:"/day/:id/", exact:true, strict:true});
    this.props.getDay(day.params.id);
  }

  render() {
    const createButtons = (
        <div className="mb-2">
        <Link to={`/create/text/${this.props.day.id}/`}>
        <button className="btn btn-primary btn-sm mr-1">Add Text</button>
        </Link>
        <Link to={`/create/medication/${this.props.day.id}/`}>
        <button className="btn btn-primary btn-sm mr-1">Add Medication</button>
        </Link>
        </div>
    )
    return (
      <Fragment>
      <div className="container mt-2">
      <h1>Entries from {this.props.day.date}</h1>
      { createButtons }
      <TextEntries texts={this.props.day.texts} />
      <MedicationEntries medications={this.props.day.medications} />
      <DrinkEntries drinks={this.props.day.drinks} />
      <PhotoEntries photos={this.props.day.photos} />
      </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  day: state.day.day,
});

export default connect(mapStateToProps, { getDay })(Day);
