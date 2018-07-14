import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Clipboard from 'react-clipboard.js';
import { history } from '../helpers/history'
import { Table, Icon, Button } from 'react-materialize'
import { getUserUpdatedData } from '../actions'

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.tick = this.tick.bind(this);
    this.tick();
  }

  tick() {
    const { dispatch } = this.props

    dispatch(getUserUpdatedData());
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidUpdate() {
    if (!this.props.isLoggedIn) {
      history.push('/login');
    }
  }

  handlePageChange(e) {
    e.preventDefault();
    
    history.push(e.currentTarget.dataset.target);
  }

  handleCopyUrlSuccess() {
    window.Materialize.toast('Link copiado', 3000);
  }

  render() {
    let tickets = this.props.user.tickets.map((ticket, i) => {
      let type = 'Cadastro'
      if (ticket.type=='invite') {
        type = 'Convidado '+ticket.related_user.name
      }
      return (
        <tr key={i}>
          <td>{ticket.hash}</td>
          <td>{type}</td>
        </tr>
      );
    })

    // const userUrl = '/register?ref='+this.props.user.id
    const userUrl = 'http://aniversario2018.beautyterapia.com.br/register?ref='+this.props.user.id

    return (
      <div>
        <div className="container">
          <h4>Boa sorte {this.props.user.name}!</h4>
          <p>
            Para ter mais chances de ganhar convide seus amigos enviando seu link:<br />
            <a href={userUrl} className="teal-text text-lighten-2">{userUrl}</a>
          </p>
          <Clipboard
            data-clipboard-text={userUrl}
            onSuccess={this.handleCopyUrlSuccess}
            component='span'
            style={{
              cursor: 'pointer'
            }}
          >
            <Button className="pink lighten-2">
              <Icon tiny left>content_copy</Icon>
              Copiar Link
            </Button>
          </Clipboard>
          <h5>Seus Tickets</h5>
          <Table striped={true}>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Origem</th>
              </tr>
            </thead>
            <tbody>
              {tickets}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
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

const connectedUserPage = connect(mapStateToProps)(UserPage);
export { connectedUserPage as UserPage };