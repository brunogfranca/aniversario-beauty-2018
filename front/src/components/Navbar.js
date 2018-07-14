import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  Icon,
  Dropdown,
  NavItem,
  Button
} from 'react-materialize';
import { history } from '../helpers/history'
import { sendUserLogout, getUserUpdatedData } from '../actions';


class Navbar extends Component {
  constructor(props) {
    super(props);
    
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.isLoggedIn) {
      dispatch(getUserUpdatedData())
    }
  }

  handleLogout(e) {
    e.preventDefault();
    
    const { dispatch } = this.props;
    dispatch(sendUserLogout())
  }

  handlePageChange(e) {
    e.preventDefault();
    
    history.push(e.currentTarget.dataset.target)
  }

  render() {
    let colorNav = 'nav-wrapper ' + this.props.color;

    let linkStyle = {
      cursor: 'pointer',
      display: 'flex'
    }
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className={colorNav}>
              <div className="container">
                <a 
                  onClick={this.handlePageChange} 
                  data-target="/" 
                  style={linkStyle} 
                  className="brand-logo hide-on-med-and-down teal-text text-lighten-2"
                >
                  <img src="http://aniversario2018.beautyterapia.com.br/imgs/sapato_blog.jpg" height="50" />
                  {this.props.siteName}
                </a>
                <a 
                  onClick={this.handlePageChange} 
                  data-target="/" 
                  style={{
                    fontSize:'22px',
                    display: 'flex'
                  }} 
                  className="brand-logo left hide-on-large-only teal-text text-lighten-2"
                >
                  <img src="http://aniversario2018.beautyterapia.com.br/imgs/sapato_blog.jpg" height="50" />
                  {this.props.siteName}
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li>
                    <a
                      className="teal-text text-lighten-2"
                      onClick={this.handlePageChange} 
                      data-target="/user" 
                    >Meus Tickets</a>
                  </li>
                  <li>
                    <a
                      className="teal-text text-lighten-2"
                      onClick={this.handlePageChange} 
                      data-target="/register" 
                    >Participe</a>
                  </li>
                  <li>
                    <a
                      className="teal-text text-lighten-2"
                      onClick={this.handlePageChange} 
                      data-target="/rules" 
                    >Regras</a>
                  </li>
                  <li>
                    <a className="teal-text text-lighten-2" href="http://www.beautyterapia.com.br">Blog</a>
                  </li>
                </ul>
                <ul className="right hide-on-large-only">
                  <Dropdown 
                    options={{
                      constrainWidth: false
                    }}
                    trigger={
                      <li><a className="teal-text text-lighten-2"><i class="material-icons">more_vert</i></a></li>
                    }
                  >
                    <NavItem>
                      <a
                        className="teal-text text-lighten-2"
                        onClick={this.handlePageChange} 
                        data-target="/user" 
                      >Meus Tickets</a>
                    </NavItem>
                    <NavItem>
                      <a
                        className="teal-text text-lighten-2"
                        onClick={this.handlePageChange} 
                        data-target="/register" 
                      >Participe</a>
                    </NavItem>
                    <NavItem>
                      <a
                        className="teal-text text-lighten-2"
                        onClick={this.handlePageChange} 
                        data-target="/rules" 
                      >Regras</a>
                    </NavItem>
                    <NavItem>
                    <a className="teal-text text-lighten-2" href="http://www.beautyterapia.com.br">Blog</a>
                    </NavItem>
                  </Dropdown>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  color: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  userData: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  isLoggingIn: PropTypes.bool,
};

function mapStateToProps(state) {
  const { userData, isLoggedIn, isLoggingIn } = state.user || {
    userData: {},
    isLoggedIn: false,
    isLoggingIn: false
  };

  return {
    userData,
    isLoggedIn,
    isLoggingIn,
  };
}

const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar };