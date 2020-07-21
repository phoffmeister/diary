import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createHeadache, getHeadacheTags } from "../../../../actions/headache";
import { connect } from "react-redux";

class CreateHeadacheEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      severity: 0,
      tags: [],
    };
  }

  handleClick(event) {
    this.props.createHeadache(
      {
        severity: this.state.severity,
        tags: this.state.tags,
        day: this.props.dayID,
      },
      () => this.clearForm()
    );
    event.preventDefault();
  }

  handleChange(event) {
    if (event.target.name.startsWith("tag-")) {
      const tagID = parseInt(event.target.name.split("-")[1]);
      if (event.target.checked) {
        this.setState({
          tags: [...this.state.tags, tagID],
        });
      } else {
        this.setState({
          tags: this.state.tags.filter((tag) => tag !== tagID),
        });
      }
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  componentDidMount() {
    this.props.getHeadacheTags();
  }

  clearForm() {
    this.setState({
      severity: 0,
      tags: [],
    });
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleClick(e)}>
        <Form.Group>
          <Form.Label>Severity: {this.state.severity}</Form.Label>
          <Form.Control
            name="severity"
            type="range"
            min="0"
            max="10"
            value={this.state.severity}
            onChange={(e) => this.handleChange(e)}></Form.Control>
        </Form.Group>
        <div key={`inline-checkbox`} className="mb-3">
          {this.props.headacheTags.map((tag) => (
            <Form.Check
              inline
              name={`tag-${tag.id}`}
              checked={this.state.tags.includes(tag.id)}
              onChange={(e) => this.handleChange(e)}
              label={tag.text}
              key={tag.id}
              type="checkbox"
            />
          ))}
        </div>
        <Button name="headacheButton" size="sm" variant="primary" type="submit">
          Create
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  headacheTags: state.headache.tags,
});

export default connect(mapStateToProps, {
  createHeadache,
  getHeadacheTags,
})(CreateHeadacheEntryForm);
