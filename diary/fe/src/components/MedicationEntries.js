import React, { Component, Fragment } from 'react';

function MedicationEntry(props) {
  console.log(props);
  return (
    <div className="card mb-1 p-2">
    FIXME
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
