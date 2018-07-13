import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  LOAD_USER_DATA
} from '../../actions';

export function userReducer(
  state = {
    user: {},
    isLoggedIn: false,
    isLoggingIn: false,
    loginError: null,
    isRegistering: false,
    registerError: null
  },
  action
) {
  switch (action.type) {
    case LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        user: {}
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isLoggingIn: false,
        user: {},
        loginError: action.data
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isLoggingIn: false,
        loginError: null
      });
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoggingIn: true,
        loginError: null
      });
    case REGISTRATION_FAILURE:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isRegistering: false,
        user: {},
        registerError: action.data
      })
    case REGISTRATION_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isRegistering: false,
        registerError: false
      });
    case REGISTRATION_REQUEST:
      return Object.assign({}, state, {
        isRegistering: true,
        registerError: false
      });
    case LOAD_USER_DATA:
      return Object.assign({}, state, {
        isLoggedIn: true,
        user: Object.assign({}, {tickets:[]}, action.data)
      });
    default:
      return state;
  }
}


