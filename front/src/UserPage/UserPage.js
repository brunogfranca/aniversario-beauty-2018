import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history } from '../helpers/history'
import { Table } from 'react-materialize'

class UserPage extends Component {
  handlePageChange(e) {
    e.preventDefault();
    
    history.push(e.currentTarget.dataset.target)
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
            Para ter mais chances de ganhar convide seus amigos enviando seu link: <a href={userUrl}>{userUrl}</a>
          </p>
          <h5>Seus Tickets</h5>
          <Table>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Origem</th>
              </tr>
            </thead>
            {tickets}
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