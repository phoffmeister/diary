import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deleteDrink } from "../../../../actions/drink";
import DeleteButton from "../../../layout/DeleteButton";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Tag(props) {
  let badge_name = "";
  switch (props.tag.tag_text) {
    case "alcoholic":
      badge_name = "danger";
      break;
    case "sugar":
    case "caffein":
      badge_name = "warning";
      break;
    case "non-alcoholic":
      badge_name = "success";
      break;
    default:
      badge_name = "primary";
  }

  return (
    <span className={"ml-2 badge badge-" + badge_name}>
      {props.tag.tag_text}
    </span>
  );
}

class DrinkEntry extends Component {
  handleClick() {
    confirmAlert({
      title: "Delete DrinkEntry",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteDrink(this.props.drink.id),
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
              {this.props.drink.time}: {this.props.drink.amount.amount}ml{" "}
              {this.props.drink.name.name}
              {this.props.drink.name.tag.map((t) => (
                <Tag key={t.id} tag={t} />
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
  deleteDrink,
})(DrinkEntry);
