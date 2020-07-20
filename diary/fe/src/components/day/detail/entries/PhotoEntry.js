import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deletePhoto } from "../../../../actions/photo";
import DeleteButton from "../../../layout/DeleteButton";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class PhotoEntry extends Component {
  handleClick() {
    confirmAlert({
      title: "Delete PhotoEntry",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deletePhoto(this.props.photo.id),
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
            <img
              className="img-fluid"
              src={"/media/" + this.props.photo.photo}
              alt="no photo"
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>{this.props.photo.caption}</Col>
          <Col xs="auto">
            <DeleteButton onClick={() => this.handleClick()} />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default connect(null, { deletePhoto })(PhotoEntry);
