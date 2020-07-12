import React, { Component, Fragment } from "react";

function MedicationEntry(props) {
  return (
    <div className="card mb-1 p-2">
      <span>
        {props.medication.time}: {props.medication.amount.amount}mg{" "}
        {props.medication.medication.name}
      </span>
    </div>
  );
}

export default MedicationEntry;
