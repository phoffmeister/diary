import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { matchPath } from "react-router-dom";
import { getDay } from '../actions/day';
import { createDrink, getDrinkOpts } from '../actions/drink';
import DatePicker from 'react-datepicker';

class CreateDrink extends Component {
  constructor(props) {
    super(props);
    this.state = {
        typeId: 0,
        amountId: 0,
        time:new Date(),
    };
  }
  componentDidMount() {
    const path = this.props.location.pathname
    const matchedPath = matchPath(path, {path:"/create/drink/:id/", exact:true, strict:true});
    this.props.getDay(matchedPath.params.id);
    this.props.getDrinkOpts();
  }

  handleClick(event) {
    this.props.createDrink({
        name: this.state.typeId,
        amount: this.state.amountId,
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
      <h1>Tell about the drinks you had on: {this.props.collection.date}</h1>
        <form onSubmit={(e) => this.handleClick(e)}>
        <label>
        Drink:
        <select
            onChange={(e) => this.handleInputChange(e)}
            value={this.state.nameId}
            name="typeId">
            <option value="0">---</option>
        {this.props.drinkOpts.types.map((opts) =>
            <option key={opts.id} value={opts.id}>{opts.name + ' (' + opts.tags.join(', ') + ')' }</option>
        )}
        </select>
        </label>
        <label>
        Amount:
        <select onChange={(e) => this.handleInputChange(e)}
            value={this.state.amountId}
            name="amountId">
            <option value="0">---</option>
        {this.props.drinkOpts.amounts.map((opts) =>
            <option key={opts.id} value={opts.id}>{opts.amount + ' (' + opts.examples.join(', ') + ')' }</option>
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
  drinkOpts: state.drink.opts,
});

export default connect(mapStateToProps, { createDrink, getDay, getDrinkOpts })(CreateDrink);
