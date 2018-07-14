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
      <div style={{
        backgroundImage: 'url("https://static.squarespace.com/static/53756cd0e4b0cf50765ac928/t/53c9c87ae4b0847eddf97a78/1405732986040/shutterstock_124159213.jpg")',
        backgroundRepeat: 'repeat',
        minHeight: '100%',
        height: '100%',
        backgroundPosition: 'center left',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
        overflow: 'auto'
      }}>
        <Navbar siteName="Beauty Terapia" color="white teal-text text-lighten-2" />
        <Router history={history}>
          <div className="container white" style={{
            minHeight: '100%',
            overflow: 'auto'
          }}>
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
