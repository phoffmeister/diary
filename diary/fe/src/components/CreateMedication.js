import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { matchPath } from "react-router-dom";
import { getDay } from '../actions/day';
import { createMedication, getMedicationOpts } from '../actions/medication';
import DatePicker from 'react-datepicker';

class CreateMedication extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active_ingredient: 0,
        amount: 0,
        time:new Date(),
    };
  }
  componentDidMount() {
    const path = this.props.location.pathname
    const matchedPath = matchPath(path, {path:"/create/medication/:id/", exact:true, strict:true});
    this.props.getDay(matchedPath.params.id);
    this.props.getMedicationOpts();
  }

  handleClick(event) {
    this.props.createMedication({
        medication: this.state.active_ingredient,
        amount: this.state.amount,
        collection: this.props.collection.id,
        time: `${this.state.time.getHours()}:${this.state.time.getMinutes()}`,
    }, this.props.history);
    event.preventDefault();
  }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

  render() {
    if( !this.props.collection ) {
      return <div>Loading</div>
    }
    return (
      <Fragment>
      <div className="container mt-2">
      <h1>Tell me which drugs you took on: {this.props.collection.date}</h1>
        <form onSubmit={(e) => this.handleClick(e)}>
        <label>
        Drug:
        <select 
            onChange={(e) => this.handleInputChange(e)} 
            value={this.state.active_ingredient}
            name="active_ingredient">
            <option value="0">---</option>
        {this.props.medicationOpts.active_ingredients.map((opts) => 
            <option key={opts.id} value={opts.id}>{opts.ingredient}</option>
        )}
        </select>
        </label>
        <label>
        Amount:
        <select onChange={(e) => this.handleInputChange(e)} 
            value={this.state.amount}
            name="amount">
            <option value="0">---</option>
        {this.props.medicationOpts.amounts.map((opts) => 
            <option key={opts.id} value={opts.id}>{opts.amount}</option>
        )}
        </select>
        </label>
        <DatePicker
      selected={this.state.time}
      onChange={date => this.setState({time:date})}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="HH:mm"
    />
      <button type="submit" className="btn btn-primary btn-sm">Create</button>
        </form>
      </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  collection: state.day.day,
  medicationOpts: state.medication.opts,
});

export default connect(mapStateToProps, { createMedication, getDay, getMedicationOpts })(CreateMedication);
