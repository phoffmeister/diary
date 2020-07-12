import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

export default function EntryAccordion(props) {
  const EntryFrom = props.form;
  return (
    <Card>
      <Accordion.Toggle
        eventKey={props.accordionID}
        as={Card.Header}
        variant="link">
        {props.title} Entries
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.accordionID}>
        <Fragment>
          <Card.Body>{props.entries.map(props.mapper)}</Card.Body>
          <Card.Body>
            <Card.Title>Create New {props.title} Entry</Card.Title>
            <EntryFrom dayID={props.dayID} />
          </Card.Body>
        </Fragment>
      </Accordion.Collapse>
    </Card>
  );
}
