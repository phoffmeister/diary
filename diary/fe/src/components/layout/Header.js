import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <strong className="mr-2">
          {user ? `Welcome, ${user.first_name}!` : ""}
        </strong>
        <Nav.Link as={Button} onClick={this.props.logout}>
          Logout
        </Nav.Link>
      </Fragment>
    );
    const guestLinks = (
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    );

    return (
      <div className="container">
        <Navbar expand="lg" bg="light">
          <Navbar.Brand href="/">Diary</Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {isAuthenticated ? authLinks : guestLinks}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
