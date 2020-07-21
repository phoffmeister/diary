import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createPhoto } from "../../../../actions/photo";
import { connect } from "react-redux";

const noop = () => {};

const FileInput = ({
  value,
  onChange = noop,
  onClick = noop,
  rotation,
  ...rest
}) => (
  <div>
    {value !== null ? (
      <div>
        Selected file: {value.name}
        <br />
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center",
            height: "250px",
            width: "250px",
          }}>
          <img
            onClick={() => onClick()}
            style={{
              transform: `rotate(${rotation}deg)`,
              maxWidth: "250px",
              maxHeight: "250px",
            }}
            src={URL.createObjectURL(value)}
          />
        </div>
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
      rotation: 0,
    };
  }

  handleClick(event) {
    event.preventDefault();
    if (this.state.photo === null) return;
    const formData = new FormData();
    formData.append("photo", this.state.photo);
    formData.append("day", this.props.dayID);
    formData.append("caption", this.state.caption);
    if (this.state.rotation != 0) {
      formData.append("rotation", 360 - this.state.rotation);
    }
    this.props.createPhoto(formData, () => this.clearForm());
  }

  handleImageClick() {
    console.log("image clicked");
    const newRotation = (this.state.rotation + 90) % 360;
    this.setState({
      rotation: newRotation,
    });
  }

  handleChange(event) {
    if (event.target.name == "caption") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else if (event.target.name == "photo") {
      this.setState({
        photo: event.target.files[0],
        rotation: 0,
      });
    }
  }

  clearForm() {
    this.setState({
      caption: "",
      photo: null,
      rotation: 0,
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
            rotation={this.state.rotation}
            onClick={() => this.handleImageClick()}
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
