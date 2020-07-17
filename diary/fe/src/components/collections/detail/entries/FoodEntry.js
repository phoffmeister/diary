import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deleteFood } from "../../../../actions/food";
import DeleteButton from "../../../layout/DeleteButton";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class FoodEntry extends Component {
  handleClick() {
    confirmAlert({
      title: "Delete FoodEntry",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteFood(this.props.food.id),
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
              {this.props.food.description}{" "}
              {this.props.food.tags.map((tag) => (
                <Badge key={tag.id} variant="primary" className="ml-2">
                  {tag.text}
                </Badge>
              ))}
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
  deleteFood,
})(FoodEntry);
