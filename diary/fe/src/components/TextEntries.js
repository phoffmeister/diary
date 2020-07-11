import React, { Component, Fragment } from "react";

function TextEntry(props) {
  return <div className="card mb-1 p-2">{props.text}</div>;
}

class TextEntries extends Component {
  render() {
    return (
      <Fragment>
        {this.props.texts.map((t) => (
          <TextEntry key={t.id} text={t.text} />
        ))}
      </Fragment>
    );
  }
}

export default TextEntries;
