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
      caption: "",
    };
  }

  handleClick(event) {
    const formData = new FormData();
    formData.append("photo", this.state.photo);
    formData.append("collection", this.props.dayID);
    formData.append("caption", this.state.caption);
    this.props.createPhoto(formData, () => this.clearForm());
    event.preventDefault();
  }

  handleChange(event) {
    if (event.target.name == "caption") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else if (event.target.name == "photo") {
      this.setState({
        photo: event.target.files[0],
      });
    }
  }

  clearForm() {
    this.setState({
      caption: "",
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
        <Form.Group>
          <Form.Label>Caption</Form.Label>
          <Form.Control
            size="sm"
            name="caption"
            type="text"
            value={this.state.caption}
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
