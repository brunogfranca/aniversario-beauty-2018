import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history } from '../helpers/history'
import { Button } from 'react-materialize'

class HowToPage extends Component {
  handlePageChange(e) {
    e.preventDefault();
    
    history.push(e.currentTarget.dataset.target)
  }

  render() {
    return (
      <div>
        <div className="container white">
          <h4>Como Participar?</h4>
          <p>
            Para participar basta se cadastrar no nosso formulário no hotsite da promoção preenchendo os dados solicitados, é ultra simples e rápido! 
          </p>
          <p>
            Esse ano resolvemos deixar a coisa ainda mais legal e criamos um sistema de tickets eletrônicos para que cada pessoa possa ter ainda mais chances de participar. 
          </p>
          <p>
            Funciona da seguinte forma:<br />
            Assim que você se cadastrar você já ganha um ticket e está automaticamente participando. <br />
            Para aumentar as suas chances você pode enviar um convite (que será um link gerado no ato da sua inscrição) para outras pessoas participarem. <br />
            Você poderá mandar esse link por Whatsapp, por e-mail, pelo Facebook ou da forma que você achar melhor. <br />
            Cada indicado cadastrado te dará direito a mais um ticket!
          </p>
          <p>
            Cada pessoa pode se inscrever apenas uma vez, mas ela pode repassar os convites para o número de pessoas que ela quiser, e cada pessoa que se inscrever através do convite que você mandou, você ganha um ticket novo e cada ticket que você recebe aumenta sua chance no sorteio final. 
          </p>
          <p>
            Para ver todas as regras basta <a onClick={this.handlePageChange} data-target="/rules" style={{cursor:'pointer'}}>clicar aqui</a>
          </p>
          <Button className="pink lighten-2" onClick={this.handlePageChange} data-target="/howto" style={{cursor:'pointer'}}>Quero Participar!</Button>
        </div>
      </div>
    );
  }
}

HowToPage.propTypes = {
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

const connectedHowToPage = connect(mapStateToProps)(HowToPage);
export { connectedHowToPage as HowToPage };