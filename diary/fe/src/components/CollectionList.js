import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { matchPath, Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faCapsules, faCocktail, faCamera } from '@fortawesome/free-solid-svg-icons'


import { getCollections } from '../actions/collections'

class CollectionListItem extends Component {
  render() {
    let attributes = <Fragment>
      { this.props.data.hasTextEntries ? <FontAwesomeIcon key="hasTextEntries" icon={faComment} /> : null}
      { this.props.data.hasDrinkEntries ? <FontAwesomeIcon key="hasDrinkEntries" icon={faCocktail} /> : null}
      { this.props.data.hasMedicationEntries ? <FontAwesomeIcon key="hasMedicationEntries" icon={faCapsules} /> : null}
      { this.props.data.hasPhotoEntries ? <FontAwesomeIcon key="hasPhotoEntries" icon={faCamera} /> : null}
    </Fragment>
    return (
      <li><Link to={`/day/${this.props.data.id}/`}>{this.props.data.date}</Link> {attributes}</li>
    );
  }
}

class CollectionList extends Component {
  static propTypes = {
    collections: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.getCollections();
  }

  render() {
    return (
      <div className="container">
      <h1>There are {this.props.collections.length} entries in your diary!</h1>
      <ul>
      {
        this.props.collections.map((col) => <CollectionListItem key={col.id} data={col}/> )
      }
      </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  collections: state.collections.collections,
});

export default connect(mapStateToProps, { getCollections })(CollectionList);
