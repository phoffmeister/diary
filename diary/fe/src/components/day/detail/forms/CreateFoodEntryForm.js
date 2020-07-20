import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createFood, getFoodTags } from "../../../../actions/food";
import { connect } from "react-redux";

class CreateFoodEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      tags: [],
    };
  }

  handleClick(event) {
    this.props.createFood(
      {
        description: this.state.description,
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
    this.props.getFoodTags();
  }

  clearForm() {
    this.setState({
      description: "",
      tags: [],
    });
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleClick(e)}>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            value={this.state.description}
            onChange={(e) => this.handleChange(e)}></Form.Control>
        </Form.Group>
        <div key={`inline-checkbox`} className="mb-3">
          {this.props.foodTags.map((tag) => (
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
        <Button name="foodButton" size="sm" variant="primary" type="submit">
          Create
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  foodTags: state.food.tags,
});

export default connect(mapStateToProps, {
  createFood,
  getFoodTags,
})(CreateFoodEntryForm);
