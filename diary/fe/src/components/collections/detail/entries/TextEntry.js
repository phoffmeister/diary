import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deleteText } from "../../../../actions/text";
import DeleteButton from "../../../layout/DeleteButton";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class TextEntry extends Component {
  handleClick() {
    confirmAlert({
      title: "Delete TextEntry",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteText(this.props.text.id),
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
          <Col>{this.props.text.text}</Col>
          <Col xs="auto">
            <DeleteButton onClick={() => this.handleClick()} />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default connect(null, {
  deleteText,
})(TextEntry);
