import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history } from '../helpers/history'
import { Button, Col, Row } from 'react-materialize'

class HomePage extends Component {
  handlePageChange(e) {
    e.preventDefault();
    
    history.push(e.currentTarget.dataset.target)
  }

  render() {
    return (
      <div>
        <img src="https://aniversario2018.beautyterapia.com.br/imgs/aniversario-beauty.jpg" onClick={this.handlePageChange} data-target="/register" width="100%" />
        <div className="container white">
          <div class="collection">
            {!this.props.isLoggedIn ? (
              <a onClick={this.handlePageChange} data-target="/register" class="collection-item pink lighten-2 center white-text" style={{cursor:'pointer'}}>Participe</a>
            ) : ''}
            <a onClick={this.handlePageChange} data-target="/user" class="collection-item" style={{cursor:'pointer'}}>Meus Tickets</a>
            <a onClick={this.handlePageChange} data-target="/howto" class="collection-item" style={{cursor:'pointer'}}>Como Participar?</a>
            <a onClick={this.handlePageChange} data-target="/rules" class="collection-item" style={{cursor:'pointer'}}>Regras</a>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  isLoggingIn: PropTypes.bool
};

function mapStateToProps(state) {
  const { user, isLoggedIn, isLoggingIn } = state.user || {
    user: {},
    isLoggedIn: false,
    isLoggingIn: false
  };
  
  return {
    user,
    isLoggedIn,
    isLoggingIn
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };