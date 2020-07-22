import React, { Fragment, useContext } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";

function ContextAwareToggle({ children, eventKey, callback, as }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;
  const AsElement = as;

  return (
    <AsElement onClick={decoratedOnClick}>
      {isCurrentEventKey ? (
        <FontAwesomeIcon icon={faAngleDown} />
      ) : (
        <FontAwesomeIcon icon={faAngleRight} />
      )}{" "}
      {children}
    </AsElement>
  );
}

export default function EntryAccordion(props) {
  const EntryFrom = props.form;
  const Children = props.children;
  return (
    <Card>
      <ContextAwareToggle as={Card.Header} eventKey={props.accordionID}>
        {props.title} Entries
      </ContextAwareToggle>
      <Accordion.Collapse eventKey={props.accordionID}>
        <Fragment>
          <Card.Body>
            {props.entries.map(props.mapper)}
            {props.children ? <Children entries={props.entries} /> : null}
          </Card.Body>
          <Card.Body>
            <Card.Title>Create New {props.title} Entry</Card.Title>
            <EntryFrom dayID={props.dayID} />
          </Card.Body>
        </Fragment>
      </Accordion.Collapse>
    </Card>
  );
}
