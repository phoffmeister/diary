import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createPhoto } from "../../../../actions/photo";
import { connect } from "react-redux";
import ExifOrientationImg from "react-exif-orientation-img";

const noop = () => {};

const FileInput = ({ value, onChange = noop, ...rest }) => (
  <div>
    {value !== null ? (
      <div>
        Selected file: {value.name}
        <br />
        <ExifOrientationImg width="250px" src={URL.createObjectURL(value)} />
      </div>
    ) : null}
    <label>
      Click to select a photo...
      <input
        {...rest}
        style={{ display: "none" }}
        type="file"
        onChange={(e) => {
          onChange(e);
        }}
      />
    </label>
  </div>
);

class CreatePhotoEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      caption: "",
    };
  }

  handleClick(event) {
    event.preventDefault();
    if (this.state.photo === null) return;
    const formData = new FormData();
    formData.append("photo", this.state.photo);
    formData.append("collection", this.props.dayID);
    formData.append("caption", this.state.caption);
    this.props.createPhoto(formData, () => this.clearForm());
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
      photo: null,
    });
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleClick(e)}>
        <Form.Group>
          <FileInput
            name="photo"
            label="Photo"
            value={this.state.photo}
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
