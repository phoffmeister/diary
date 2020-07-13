import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createDrink, getDrinkOpts } from "../../../../actions/drink";
import { connect } from "react-redux";

class CreateTextEntryForm extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    this.state = {
      time,
      drinkTypeId: 0,
      drinkAmountId: 0,
    };
  }

  handleClick(event) {
    this.props.createDrink(
      {
        name: this.state.drinkTypeId,
        amount: this.state.drinkAmountId,
        collection: this.props.dayID,
        time: this.state.time,
      },
      () => this.clearForm()
    );
    event.preventDefault();
  }

  componentDidMount() {
    this.props.getDrinkOpts();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  clearForm() {
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    this.setState({
      time,
      drinkTypeId: 0,
      drinkAmountId: 0,
    });
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleClick(e)}>
        <Form.Group>
          <Form.Label>Drink</Form.Label>
          <Form.Control
            name="drinkTypeId"
            as="select"
            value={this.state.drinkTypeId}
            onChange={(e) => this.handleChange(e)}>
            <option value="0">---</option>
            {this.props.drinkOpts.types.map((opts) => (
              <option key={opts.id} value={opts.id}>
                {opts.name + " (" + opts.tags.join(", ") + ")"}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            name="drinkAmountId"
            as="select"
            value={this.state.drinkAmountId}
            onChange={(e) => this.handleChange(e)}>
            <option value="0">---</option>
            {this.props.drinkOpts.amounts.map((opts) => (
              <option key={opts.id} value={opts.id}>
                {opts.amount + " (" + opts.examples.join(", ") + ")"}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control
            name="time"
            type="time"
            value={this.state.time}
            onChange={(e) => this.handleChange(e)}
          />
        </Form.Group>
        <Button name="drinkButton" size="sm" variant="primary" type="submit">
          Create
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  drinkOpts: state.drink.opts,
});

export default connect(mapStateToProps, { createDrink, getDrinkOpts })(
  CreateTextEntryForm
);
