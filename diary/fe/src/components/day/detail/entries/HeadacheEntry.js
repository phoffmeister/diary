import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deleteHeadache } from "../../../../actions/headache";
import DeleteButton from "../../../layout/DeleteButton";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class HeadacheEntry extends Component {
  handleClick() {
    confirmAlert({
      title: "Delete HeadacheEntry",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteHeadache(this.props.headache.id),
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
            <ProgressBar now={this.props.headache.severity * 10} />
          </Col>
          <Col xs="auto">
            <DeleteButton onClick={() => this.handleClick()} />
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.headache.tags.map((tag) => (
              <Badge key={tag.id} variant="primary" className="ml-2">
                {tag.text}
              </Badge>
            ))}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default connect(null, {
  deleteHeadache,
})(HeadacheEntry);
