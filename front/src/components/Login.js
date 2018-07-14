import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from 'react-materialize';
import { history } from '../helpers/history'
import {
  sendUserLogin
} from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showError: false
    }

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleLoginClick(e) {
    e.preventDefault();
    
    const { dispatch } = this.props;
    let loginData = {
      username: this.state.username.toLocaleLowerCase(),
      password: this.state.password
    }
    dispatch(sendUserLogin(loginData));
  }

  handlePageChange(e) {
    e.preventDefault();
    
    history.push(e.currentTarget.dataset.target)
  }

  componentDidUpdate(prevProps) {
    if (this.props.loginError && !prevProps.loginError) {
      window.Materialize.toast(this.props.loginError, 3000);
    }
    if (this.props.isLoggedIn) {
      history.push('/user')
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLoginClick}>
          <Input 
            s={6} 
            name="username" 
            label="Email"
            value={this.state.username} 
            onChange={this.handleInputChange} 
            style={{
              textTransform: 'lowercase'
            }}
          />
          <Input 
            s={6} 
            name="password" 
            type="password" 
            label="Password"
            value={this.state.password} 
            onChange={this.handleInputChange} 
          />
          <a 
            onClick={this.handlePageChange} 
            data-target="/register"
            style={{
              cursor: 'pointer'
            }}
            className="teal-text text-lighten-2"
          >
            Ainda não estou participando
          </a>
          <Button className="right pink lighten-2" type="submit">
            Entrar
          </Button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  isLoggingIn: PropTypes.bool,
  loginError: PropTypes.string,
};

function mapStateToProps(state) {
  const { user, isLoggedIn, isLoggingIn, loginError } = state.user || {
    user: {},
    isLoggedIn: false,
    isLoggingIn: false,
    loginError: false
  };

  return {
    user,
    isLoggedIn,
    isLoggingIn,
    loginError
  };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };