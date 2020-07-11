import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { id, alert, message } = this.props;
    if (id !== prevProps.id) {
      alert.show(message);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  message: state.messages.message,
  id: state.messages.id,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
