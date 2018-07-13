import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login } from '../components/Login'
import { Row, Col } from 'react-materialize';

class LoginPage extends Component {
  render() {
    return (
      <div className="container">
        <Row>
          <h4>Login</h4>
          <Col>
            <Login />
          </Col>
        </Row>
      </div>
    )
  }
}

LoginPage.propTypes = {
  
};

function mapStateToProps(state) {
  const { userData, isLoggedIn, isLoggingIn } = state.userData || {
    userData: {},
    isLoggedIn: false,
    isLoggingIn: false
  };

  return {
    userData,
    isLoggedIn,
    isLoggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };