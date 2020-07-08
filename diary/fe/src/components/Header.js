import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

class Header extends Component {
static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
    render() {
      const { isAuthenticated, user } = this.props.auth;

      const authLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.first_name}` : ''}</strong>
          </span>
          <li className="nav-item">
            <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">
              Logout
            </button>
          </li>
        </ul>
      );
  const guestLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      );
        return (
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                  Diary
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="#">
                            All Entries <span className="sr-only">(current)</span>
                        </a>
                    </div>
          {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
