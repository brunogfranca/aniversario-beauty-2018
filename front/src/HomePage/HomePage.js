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
        <div className="container white">
          <h4>Aniversário 4 anos Beauty Terapia</h4>
          <Row>
            {!this.props.isLoggedIn ? (
              <Col m={6} s={12} style={{marginTop:'5px'}}>
                <Button onClick={this.handlePageChange} data-target="/register" className="pink lighten-2">Participe</Button>
              </Col>
            ) : ''}
            <Col m={6} s={12} style={{marginTop:'5px'}}>
              <Button onClick={this.handlePageChange} data-target="/user" className="pink lighten-2">Ver seus Tickets</Button>
            </Col>
          </Row>
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