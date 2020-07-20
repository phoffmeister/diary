import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createText } from "../../../../actions/text";
import { connect } from "react-redux";

class CreateTextEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  handleClick(event) {
    this.props.createText(
      {
        day: this.props.dayID,
        text: this.state.text,
      },
      () => this.clearForm()
    );
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  clearForm() {
    this.setState({
      text: "",
    });
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleClick(e)}>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control
            name="text"
            as="textarea"
            rows="3"
            value={this.state.text}
            onChange={(e) => this.handleChange(e)}
          />
        </Form.Group>
        <Button name="textButton" size="sm" variant="primary" type="submit">
          Create
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { createText })(CreateTextEntryForm);
