import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { matchPath } from "react-router-dom";
import TextEntry from "./entries/TextEntry";
import DrinkEntry from "./entries/DrinkEntry";
import PhotoEntry from "./entries/PhotoEntry";
import MedicationEntry from "./entries/MedicationEntry";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import CreateTextEntryForm from "./forms/CreateTextEntryForm";
import CreatePhotoEntryForm from "./forms/CreatePhotoEntryForm";
import CreateMedicationEntryForm from "./forms/CreateMedicationEntryForm";
import CreateDrinkEntryForm from "./forms/CreateDrinkEntryForm";
import { getDay } from "../../../actions/day";
import EntryAccordion from "./EntryAccordion";

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
    return (
      <div className="container">
        <Accordion className="mt-2" defaultActiveKey="0">
          <Card>
            <Card.Header>Entries from {this.props.day.date}</Card.Header>
          </Card>
          <EntryAccordion
            title="Text"
            form={CreateTextEntryForm}
            dayID={this.state.dayID}
            accordionID="0"
            entries={this.props.day.texts}
            mapper={(e) => <TextEntry key={e.id} text={e} />}
          />
          <EntryAccordion
            title="Photo"
            form={CreatePhotoEntryForm}
            dayID={this.state.dayID}
            accordionID="1"
            entries={this.props.day.photos}
            mapper={(e) => <PhotoEntry key={e.id} photo={e} />}
          />
          <EntryAccordion
            title="Drink"
            form={CreateDrinkEntryForm}
            dayID={this.state.dayID}
            accordionID="2"
            entries={this.props.day.drinks}
            mapper={(e) => <DrinkEntry key={e.id} drink={e} />}
          />
          <EntryAccordion
            title="Medication"
            form={CreateMedicationEntryForm}
            dayID={this.state.dayID}
            accordionID="3"
            entries={this.props.day.medications}
            mapper={(e) => <MedicationEntry key={e.id} medication={e} />}
          />
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
