import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { matchPath, Link } from "react-router-dom";
import TextEntry from "./entries/TextEntry";
import DrinkEntry from "./entries/DrinkEntry";
import PhotoEntry from "./entries/PhotoEntry";
import MedicationEntry from "./entries/MedicationEntry";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import CreateTextEntryForm from "./forms/CreateTextEntryForm";
import CreatePhotoEntryForm from "./forms/CreatePhotoEntryForm";
import CreateMedicationEntryForm from "./forms/CreateMedicationEntryForm";
import CreateDrinkEntryForm from "./forms/CreateDrinkEntryForm";
import { getDay } from "../../../actions/day";

class CollectionDetail extends Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const path = this.props.location.pathname;
    const day = matchPath(path, {
      path: "/day/:id/",
      exact: true,
      strict: true,
    });
    this.state = {
      dayID: day.params.id,
    };
  }

  componentDidMount() {
    this.props.getDay(this.state.dayID);
  }

  render() {
    const createTextAccordion = (
      <Card>
        <Accordion.Toggle eventKey="0" as={Card.Header} variant="link">
          Text Entries
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Fragment>
            <Card.Body>
              {this.props.day.texts.map((t) => (
                <TextEntry key={t.id} text={t.text} />
              ))}
            </Card.Body>
            <Card.Body>
              <Card.Title>Create New Text Entry</Card.Title>
              <CreateTextEntryForm dayID={this.state.dayID} />
            </Card.Body>
          </Fragment>
        </Accordion.Collapse>
      </Card>
    );

    const createPhotoAccordion = (
      <Card>
        <Accordion.Toggle eventKey="1" as={Card.Header} variant="link">
          Photo Entries
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Fragment>
            <Card.Body>
              {this.props.day.photos.map((t) => (
                <PhotoEntry key={t.id} photo={t} />
              ))}
            </Card.Body>
            <Card.Body>
              <Card.Title>Create New Photo Entry</Card.Title>
              <CreatePhotoEntryForm dayID={this.state.dayID} />
            </Card.Body>
          </Fragment>
        </Accordion.Collapse>
      </Card>
    );

    const createMedicationAccordion = (
      <Card>
        <Accordion.Toggle eventKey="2" as={Card.Header} variant="link">
          Medication Entries
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
          <Fragment>
            <Card.Body>
              {this.props.day.medications.map((m) => (
                <MedicationEntry key={m.id} medication={m} />
              ))}
            </Card.Body>
            <Card.Body>
              <Card.Title>Create New Medication Entry</Card.Title>
              <CreateMedicationEntryForm dayID={this.state.dayID} />
            </Card.Body>
          </Fragment>
        </Accordion.Collapse>
      </Card>
    );

    const createDrinkAccordion = (
      <Card>
        <Accordion.Toggle eventKey="3" as={Card.Header} variant="link">
          Create Drink Entry
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="3">
          <Fragment>
            <Card.Body>
              {this.props.day.drinks.map((d) => (
                <DrinkEntry key={d.id} drink={d} />
              ))}
            </Card.Body>
            <Card.Body>
              <Card.Title>Create New Drink Entry</Card.Title>
              <CreateDrinkEntryForm dayID={this.state.dayID} />
            </Card.Body>
          </Fragment>
        </Accordion.Collapse>
      </Card>
    );

    return (
      <div className="container">
        <Accordion className="mt-2" defaultActiveKey="0">
          <Card>
            <Card.Header>Entries from {this.props.day.date}</Card.Header>
          </Card>
          {createTextAccordion}
          {createPhotoAccordion}
          {createDrinkAccordion}
          {createMedicationAccordion}
        </Accordion>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  day: state.day.day,
});

export default connect(mapStateToProps, {
  getDay,
})(CollectionDetail);
