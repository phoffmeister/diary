import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faCapsules, faCocktail, faCamera } from '@fortawesome/free-solid-svg-icons'


import { getCollections, createCollection } from '../actions/collections'

class CollectionListRow extends Component {
  render() {
    let centerStyle = { textAlign: 'center' };
    return (
      <tr>
        <td>
          <Link to={`/day/${this.props.data.id}/`}>{this.props.data.date}</Link>
        </td>
        <td style={centerStyle}>
          {this.props.data.hasTextEntries ? <FontAwesomeIcon key="hasTextEntries" icon={faComment} /> : null}
        </td>
        <td style={centerStyle}>
          {this.props.data.hasDrinkEntries ? <FontAwesomeIcon key="hasDrinkEntries" icon={faCocktail} /> : null}
        </td>
        <td style={centerStyle}>
          {this.props.data.hasMedicationEntries ? <FontAwesomeIcon key="hasMedicationEntries" icon={faCapsules} /> : null}
        </td>
        <td style={centerStyle}>
          {this.props.data.hasPhotoEntries ? <FontAwesomeIcon key="hasPhotoEntries" icon={faCamera} /> : null}
        </td>
      </tr>
    );
  }
}

class CollectionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString().substr(0, 10),
    }
  }
  static propTypes = {
    collections: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.getCollections();
  }

  handleChange(event) {
    this.setState({
      date: event.target.value,
    })
  }

  handleClick(e) {
    this.props.createCollection(this.state.date);
    e.preventDefault();
  }

  render() {
    let centerStyle = { textAlign: 'center' };
    return (
      <div className="container">
        <Accordion className="mt-2">
          <Card>
            <Accordion.Toggle eventKey="0" as={Card.Header} className="text-right" variant="link">
              Add more...
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" value={this.state.date} onChange={date => this.handleChange(date)} />
                  </Form.Group>
                  <Button
                    size="sm"
                    variant="primary"
                    type="submit"
                    onClick={(e) => this.handleClick(e)} >
                    Create new
                  </Button>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Table hover striped bordered size="sm" className="mt-2">
          <thead>
            <tr>
              <th>Date</th>
              <th style={centerStyle}><FontAwesomeIcon key="hasTextEntries" icon={faComment} /></th>
              <th style={centerStyle}><FontAwesomeIcon key="hasDrinkEntries" icon={faCocktail} /></th>
              <th style={centerStyle}><FontAwesomeIcon key="hasMedicationEntries" icon={faCapsules} /></th>
              <th style={centerStyle}><FontAwesomeIcon key="hasMedicationEntries" icon={faCamera} /></th>
            </tr>
          </thead>
          <tbody>
            {this.props.collections.map((col) => <CollectionListRow key={col.id} data={col} />)}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  collections: state.collections.collections,
});

export default connect(mapStateToProps, { getCollections, createCollection })(CollectionList);
