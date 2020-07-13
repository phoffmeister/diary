import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonStyle: "outline-danger",
    };
  }
  render() {
    return (
      <Button
        onMouseEnter={() => this.setState({ buttonStyle: "danger" })}
        onMouseLeave={() => this.setState({ buttonStyle: "outline-danger" })}
        size="sm"
        variant={this.state.buttonStyle}
        onClick={() => this.props.onClick()}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    );
  }
}
