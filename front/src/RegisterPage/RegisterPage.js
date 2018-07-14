import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { history } from '../helpers/history'
import { Button, Input, Row, Col } from 'react-materialize';
import { checkEmail, checkPassword } from '../helpers/validators';
import { sendUserRegistration } from '../actions';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(this.props.location.search)
    
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      terms: false,
      formErrors: {},
      isFormValid: false,
      ref: params.get('ref')
    }
    
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    window.$('#modal_login').modal('close');
    if (this.props.isLoggedIn) {
      history.push('/user')
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.registerError && this.props.registerError) {
      window.Materialize.toast(this.props.registerError, 3000);
    }

    if (this.props.isLoggedIn) {
      window.Materialize.toast('Cadastro Completo', 3000);
      history.push('/user')
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    if (name=='email') {
      this.setState({
        'username': value
      });
    }
  }

  validateField(field, cb) {
    let promise = new Promise((resolve, reject) => {
      switch (field) {
        case 'email':
          if (!checkEmail(this.state.email)) {
            this.setState(prevState => ({
              isFormValid:false,
              formErrors: {
                    ...prevState.formErrors,
                    email: 'Please enter a valid email format'
                }
            }), resolve)
            return;
          }
  
          if (!this.state.email || this.state.email === "") {
            this.setState(prevState => ({
              isFormValid:false,
              formErrors: {
                    ...prevState.formErrors,
                    email: 'Please, enter your email'
                }
            }), resolve)
            return;
          }
          return resolve();
        case 'password':
          if (!checkPassword(this.state.password)) {
            this.setState(prevState => ({
              isFormValid:false,
              formErrors: {
                    ...prevState.formErrors,
                    password: 'Your password must have at least 8 characters and include letters and numbers'
                }
            }), resolve)
            return;
          }

          if (!this.state.password || this.state.password === "") {
            this.setState(prevState => ({
              isFormValid:false,
              formErrors: {
                    ...prevState.formErrors,
                    password: 'Please, enter your password'
                }
            }), resolve)
            return;
          }
          return resolve();
        default:
          return resolve();
      }
    });
    return promise;
  }

  validateForm() {
    var promise = new Promise((resolve, reject) => {
      this.setState(prevState => ({
        isFormValid:true,
        formErrors:{}
      }), () => {
        return this.validateField('email').then(() => {
          return this.validateField('password');
        }).then(() => {
          return resolve();
        });
      });
    });
    return promise;
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props

    this.validateForm().then(() => {
      let registrationData = _.pick(this.state, ['first_name','last_name','email','password', 'username', 'ref'])
      if (this.state.isFormValid) {
        dispatch(sendUserRegistration(registrationData));
      }
    })
  }

  render() {
    let termsStyle = {
      marginTop: '40px'
    }

    let termsErrorMessage = ''
    if (this.state.formErrors['terms'])
      termsErrorMessage = (
        <Col s={12}>
          <Col s={12} className="red-text">
            {this.state.formErrors['terms']}
          </Col>
        </Col>
      )

    return (
      <div className="container">
        <h4>Participe!</h4>
        <form onSubmit={this.handleFormSubmit}>
          <Row>
            <Col s={12}>
              <Input s={6} 
                name="first_name" 
                label="Nome"
                className="validate"
                error={this.state.formErrors['first_name']} 
                onChange={this.handleInputChange}
                />
              <Input s={6} 
                name="last_name" 
                label="Sobrenome"
                error={this.state.formErrors['last_name']} 
                onChange={this.handleInputChange}
                />
            </Col>
          </Row>
          <Row>
            <Col s={12}>
              <Input s={12} 
                type="email" 
                name="email" 
                label="Email"
                className="validate"
                error={this.state.formErrors['email']} 
                style={{
                  textTransform: 'lowercase'
                }}
                onChange={this.handleInputChange}
                />
            </Col>
          </Row>
          <Row>
            <Col s={12}>
              <Input s={12}  
                type="password" 
                name="password" 
                label="Senha"
                className="validate" 
                error={this.state.formErrors['password']} 
                onChange={this.handleInputChange}
                />
            </Col>
          </Row>
          <Row>
            <Col s={12}>
              <Button s={12} large={true} type="submit" className="red lighten-2">
                Participar
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  
};

function mapStateToProps(state) {
  const { user, registerError, isLoggedIn, isLoggingIn } = state.user || {
    user: {},
    registerError: '',
    isLoggedIn: false,
    isLoggingIn: false
  };

  return {
    user,
    registerError,
    isLoggedIn,
    isLoggingIn
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };