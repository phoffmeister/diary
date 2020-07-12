import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MERROR, MSUCCESS, MINFO } from "../../actions/messages";

export class Alerts extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { id, message_type, alert, message } = this.props;
    if (id !== prevProps.id) {
      switch (message_type) {
        case MERROR:
          alert.error(message);
          break;
        case MSUCCESS:
          alert.success(message);
          break;
        case MINFO:
          alert.info(message);
          break;
        default:
          alert.show(message);
          break;
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  message: state.messages.message,
  message_type: state.messages.message_type,
  id: state.messages.id,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
