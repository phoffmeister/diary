import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  createMedication,
  getMedicationOpts,
} from "../../../../actions/medication";
import { connect } from "react-redux";

class CreateMedicationEntryForm extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    this.state = {
      time,
      medNameId: 0,
      medAmountId: 0,
    };
  }

  handleClick(event) {
    this.props.createMedication(
      {
        time: this.state.time,
        medication: this.state.medNameId,
        amount: this.state.medAmountId,
        collection: this.props.dayID,
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

  componentDidMount() {
    this.props.getMedicationOpts();
  }

  clearForm() {
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    this.setState({
      time,
      medNameId: 0,
      medAmountId: 0,
    });
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleClick(e)}>
        <Form.Group>
          <Form.Label>Medication</Form.Label>
          <Form.Control
            name="medNameId"
            as="select"
            value={this.state.medNameId}
            onChange={(e) => this.handleChange(e)}>
            <option value="0">---</option>
            {this.props.medicationOpts.names.map((opts) => (
              <option key={opts.id} value={opts.id}>
                {opts.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            name="medAmountId"
            as="select"
            value={this.state.medAmountId}
            onChange={(e) => this.handleChange(e)}>
            <option value="0">---</option>
            {this.props.medicationOpts.amounts.map((opts) => (
              <option key={opts.id} value={opts.id}>
                {opts.amount}
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
        <Button name="medButton" size="sm" variant="primary" type="submit">
          Create
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  medicationOpts: state.medication.opts,
});

export default connect(mapStateToProps, {
  createMedication,
  getMedicationOpts,
})(CreateMedicationEntryForm);
