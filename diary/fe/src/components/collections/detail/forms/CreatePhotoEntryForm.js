import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createPhoto } from "../../../../actions/photo";
import { connect } from "react-redux";

class CreatePhotoEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
    };
  }

  handleClick(event) {
    const formData = new FormData();
    formData.append("photo", this.state.photo);
    formData.append("collection", this.props.dayID);
    this.props.createPhoto(formData);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      photo: event.target.files[0],
    });
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleClick(e)}>
        <Form.Group>
          <Form.File
            name="photo"
            label="Photo"
            onChange={(e) => this.handleChange(e)}
          />
        </Form.Group>
        <Button name="photoButton" size="sm" variant="primary" type="submit">
          Create
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { createPhoto })(CreatePhotoEntryForm);
