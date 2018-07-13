import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
// import Clipboard from 'react-clipboard.js';
import { history } from '../helpers/history'
import { PrivateRoute } from '../components/PrivateRoute'
import { Navbar } from '../components/Navbar';
import { HomePage } from '../HomePage/HomePage'
import { LoginPage } from '../LoginPage/LoginPage'
import { UserPage } from '../UserPage/UserPage'
import { RegisterPage } from '../RegisterPage/RegisterPage'
import { getUserData, getUserUpdatedData } from '../actions'

class AsyncApp extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getUserData());
    dispatch(getUserUpdatedData());
  }

  render() {
    return (
      <div>
        <Navbar siteName="Beauty Terapia" color="indigo" />
        <Router history={history}>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/register" component={RegisterPage} />
            <PrivateRoute exact path="/user" component={UserPage} />
            <Route path="/login" component={LoginPage} />
          </div>
        </Router>
      </div>
    );
  }
}

AsyncApp.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { user, isLoggedIn } = state.user || {
    user: {},
    isLoggedIn: false
  };

  return {
    user,
    isLoggedIn
  };
}

export default connect(mapStateToProps)(AsyncApp);
