import React, { Component, Fragment } from 'react';

function MedicationEntry(props) {
  return (
    <div className="card mb-1 p-2">
      <span>{props.medication.time}: {props.medication.amount.amount}mg {props.medication.medication.active_ingredient}</span>
    </div>
  )
}

class MedicationEntries extends Component {
  render() {
    return (
      <Fragment>{this.props.medications.map((m) => <MedicationEntry key={m.id} medication={m}/>)}</Fragment>
    );
  }
}

export default MedicationEntries;
