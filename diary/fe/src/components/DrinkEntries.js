import React, { Component, Fragment } from 'react';

function Tag(props) {
    let badge_name = '';
    switch (props.tag.tag_text) {
        case 'alcoholic':
            badge_name = 'danger';
            break;
        case 'sugar':
        case 'caffein':
            badge_name = 'warning';
            break;
        case 'non-alcoholic':
            badge_name = 'success';
            break;
        default:
            badge_name = 'primary';
            
    }

  return (
      <span className={'ml-2 badge badge-'+badge_name}>{props.tag.tag_text}</span>
  )
}

function DrinkEntry(props) {
  return (
    <div className="card mb-1 p-2">
      <span>{props.drink.time}: {props.drink.amount.amount}ml {props.drink.name.name}{props.drink.name.tag.map(t => <Tag key={t.id} tag={t}/>)}</span>
    </div>
  )
}

class DrinkEntries extends Component {
  render() {
    return (
      <Fragment>{this.props.drinks.map((d) => <DrinkEntry key={d.id} drink={d}/>)}</Fragment>
    );
  }
}

export default DrinkEntries;
