import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history } from '../helpers/history'
import { Collection, CollectionItem } from 'react-materialize'

class RulesPage extends Component {
  handlePageChange(e) {
    e.preventDefault();
    
    history.push(e.currentTarget.dataset.target)
  }

  render() {
    const listProducts = [
      {
        name: '1x Óleo Emebelezador Lágrimas de Unicórino da Cat Make',
        image: 'https://aniversario2018.beautyterapia.com.br/imgs/products/catmake.jpg'
      },
      {
        name: '1x Paleta Facial Cheek Glow Studio Palette da Ruby Rose',
        image: 'https://aniversario2018.beautyterapia.com.br/imgs/products/cheekglow.jpg'
      },
      {
        name: '1x Paleta de Sombras Rose Spirit Palette da Ruby Rose',
        image: 'https://aniversario2018.beautyterapia.com.br/imgs/products/rose+spirit.jpg'
      },
      {
        name: '1x Máscara Facial de Argila Purificante da Vichy',
        image: 'https://aniversario2018.beautyterapia.com.br/imgs/products/argila+vichy.jpg'
      },
      {
        name: '1x Esmalte Risqué Coleção Disney - Lacinho de Poá',
        image: 'https://aniversario2018.beautyterapia.com.br/imgs/products/lacinho+de+poa.jpg'
      },
      {
        name: '1x Esmalte Risqué Coleção Disney - Babados e Bolinhas',
        image: 'https://aniversario2018.beautyterapia.com.br/imgs/products/babados+e+bolinha.jpg'
      },
      {
        name: '1x Conjunto de Mini Lixas de Unha da Ricca',
        image: 'https://aniversario2018.beautyterapia.com.br/imgs/products/mini+lixa1.jpg'
      },
      {
        name: '1x Tesoura de Unha Girls da Ricca',
        image: 'https://aniversario2018.beautyterapia.com.br/imgs/products/tesoura.jpg'
      },
      {
        name: '1x Bombons Sortidos',
        image: 'https://aniversario2018.beautyterapia.com.br/imgs/products/chocopromo.jpg'
      },
    ]
    let products = listProducts.map((product, i) => {
      return (
        <CollectionItem key={i} className="avatar" style={{minHeight:'60px', lineHeight:'41px'}}>
          <img src={product.image} alt="" class="circle" />
          {product.name}
        </CollectionItem>
      );
    });

    const RulesList = [
      (<Fragment>Cadastrar nome, e-mail e senha no hotsite da promoção.</Fragment>),
      (<Fragment>Cada e-mail poderá ser cadastrado somente uma única vez.</Fragment>),
      (<Fragment>Possuir CEP em território nacional reconhecido pelos correios (o envio do prêmio será feito através dos correios).</Fragment>),
      (<Fragment>O sorteio se encerra no dia 21/07/2018 às 23:59 e o vencedor será anunciado no dia 23/07/2018 em um post no blog Beauty Terapia - <a href="http://www.beautyterapia.com.br">www.beautyterapia.com.br</a>.</Fragment>),
      (<Fragment>O sorteio será feito a partir de tickets distribuídos de duas maneiras: 1 ticket no momento do cadastro; 1 ticket para cada cadastrado indicado.</Fragment>),
      (<Fragment>O sorteio será feito através de um programa que irá escolher de forma aleatória e eletrônica um dos tickets participantes.</Fragment>),
      (<Fragment>O vencedor receberá um e-mail avisando sobre o sorteio e solicitando o endereço completo e outras informações para o envio do prêmio.</Fragment>),
      (<Fragment>O vencedor terá até 7 dias para responder o e-mail com as informações solicitadas. Caso a pessoa não responda, haverá um novo sorteio. As regras para o novo vencedor serão as mesmas citadas acima</Fragment>),
      (<Fragment>Ao participar de nosso sorteio você automaticamente assina nossa newsletter.</Fragment>)
    ]
    let rules = RulesList.map((rule, i) => {
      return (
        <li key={i} style={{listStyleType: 'disc'}}>
          {rule}
        </li>
      );
    });
    return (
      <div>
        <div className="container white">
          <h4>Regras</h4>
          <p>
            <h5>Produtos Sorteados</h5>
            <Collection>
              {products}
            </Collection>
          </p>
          <p>
          <h5>Regras e Prazos</h5>
            <ul style={{marginLeft:'15px'}}>
              {rules}
            </ul>
          </p>
        </div>
      </div>
    );
  }
}

RulesPage.propTypes = {
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

const connectedRulesPage = connect(mapStateToProps)(RulesPage);
export { connectedRulesPage as RulesPage };