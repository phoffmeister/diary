import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deleteMedication } from "../../../../actions/medication";
import DeleteButton from "../../../layout/DeleteButton";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class MedicationEntry extends Component {
  handleClick() {
    confirmAlert({
      title: "Delete MedicationEntry",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteMedication(this.props.medication.id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }
  render() {
    return (
      <Card className="mb-1 p-2">
        <Row>
          <Col>
            <span>
              {this.props.medication.time}:{" "}
              {this.props.medication.amount.amount}mg{" "}
              {this.props.medication.medication.name}
            </span>
          </Col>
          <Col xs="auto">
            <DeleteButton onClick={() => this.handleClick()} />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default connect(null, {
  deleteMedication,
})(MedicationEntry);
