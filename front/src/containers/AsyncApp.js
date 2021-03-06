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
import { RulesPage } from '../Rulespage/RulesPage';
import { HowToPage } from '../HowToPage/HowToPage';
import ScrollToTop from '../helpers/scrollToTop'


class AsyncApp extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getUserData());
    dispatch(getUserUpdatedData());
  }

  render() {
    return (
      <div style={{
        backgroundImage: 'url("https://aniversario2018.beautyterapia.com.br/imgs/bg-beauty.jpg")',
        backgroundRepeat: 'repeat',
        minHeight: '100%',
        height: '100%',
        backgroundPosition: 'center left',
        backgroundSize: 'contain',
        backgroundAttachment: 'fixed',
        overflow: 'auto'
      }}>
        <Navbar siteName="Beauty Terapia" color="white teal-text text-lighten-2" />
        <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
          <div className="container white" style={{
            minHeight: '100%',
            overflow: 'auto'
          }}>
            <ScrollToTop>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/register" component={RegisterPage} />
              <PrivateRoute exact path="/user" component={UserPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/rules" component={RulesPage} />
              <Route path="/howto" component={HowToPage} />
            </ScrollToTop>
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
