import fetch from 'cross-fetch';
import { baseHeaders, authHeader } from '../helpers/headers'
import { checkStatus, parseJSON, handleError } from '../helpers/request'
import jwt_decode from 'jwt-decode'
import _ from 'lodash'

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';
export const LOGOUT = 'USERS_LOGOUT';

export const LOAD_USER_DATA = 'LOAD_USER_DATA';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';

export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const USER_DATA_REQUEST_FAILURE = 'USER_DATA_REQUEST_FAILURE';

export const USER_TRANSACTIONS_REQUEST = 'USER_TRANSACTIONS_REQUEST';
export const USER_TRANSACTIONS_FAILURE = 'USER_TRANSACTIONS_FAILURE';
export const USER_TRANSACTIONS_SUCCESS = 'USER_TRANSACTIONS_SUCCESS';

export function sendUserLogin(loginData) {
  return (dispatch, getState) => {
    if (isUserLoggedIn(getState())) {
      dispatch(logoutUser())
    }
    return dispatch(loginUser(loginData));
  };
}

function isUserLoggedIn(state) {
  const userData = state.user;
  if (!userData) {
    return false;
  }
  return userData.isLoggedIn;
}

export function getUserData() {
  return (dispatch) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData){
      dispatch(loadUserData(userData))
    }
  };
}

function loadUserData(userData) {
  return {
    type: LOAD_USER_DATA,
    data: userData
  }
}

function sendLogin() {
  return {
    type: LOGIN_REQUEST
  }
}

function loginUser(loginData) {
  return dispatch => {
    dispatch(sendLogin());
    let headers = baseHeaders({})
    headers = authHeader(headers)
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        username: loginData.username, 
        password: loginData.password 
      })
    };
    return fetch(`/api/api-token-auth/`, requestOptions)
      .catch(handleError)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        if (!data || !data.token) {
          dispatch(userLoginFailure(data));
        } else {
          let parsedData = {};
          try {
            parsedData = jwt_decode(data.token);
          } catch (err) {
            dispatch(userLoginFailure(err));
          }
          if (data && parsedData) {
            localStorage.setItem('user', JSON.stringify(parsedData));
            localStorage.setItem('token', data.token);
            dispatch(loadUserData(parsedData));
            dispatch(getUserUpdatedData());
            dispatch(userLoggedIn());
          } else {
            dispatch(userLoginFailure(data));
          }
        }
      })
      .catch(err => {
        dispatch(userLoginFailure(err));
      });
  };
}

function userLoggedIn() {
  return {
    type: LOGIN_SUCCESS
  };
}

function userLoginFailure(json) {
  return (dispatch, getState) => {
    return dispatch({
      type: LOGIN_FAILURE,
      data: 'Email/senha inválidos'
    });
  };
}

export function sendUserLogout() {
  return (dispatch, getState) => {
    if (isUserLoggedIn(getState())) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return dispatch(logoutUser())
    }
  };
}

function logoutUser() {
  return {
    type: LOGOUT
  }
}

export function sendUserRegistration(registrationData) {
  return (dispatch, getState) => {
    if (isUserLoggedIn(getState())) {
      dispatch(logoutUser())
    }
    return dispatch(registerUser(registrationData));
  };
}

function sendRegistration() {
  return {
    type: REGISTRATION_REQUEST
  }
}

function userRegistrationFailure(json) {
  return {
    type: REGISTRATION_FAILURE,
    data: json.detail
  };
}

function userRegistered() {
  return {
    type: REGISTRATION_SUCCESS
  };
}

function registerUser(registrationData) {
  return dispatch => {
    dispatch(sendRegistration());
    let headers = baseHeaders({})
    if (!registrationData.ref) {
      _.unset(registrationData, 'ref')
    }
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(registrationData)
    };
    return fetch(`/api/api/users/`, requestOptions)
      .then(response => {
        return {
          response: response,
          json: response.json()
        };
      })
      .then(response => {
        if (!response.response.ok) { 
          return response.json.then((err) => {
            return Promise.reject(err);
          });
        }
        return response.json;
      })
      .then(data => {
        if (!data || !data.token) {
          dispatch(userRegistrationFailure(data));
        } else {
          let parsedData = {};
          try {
            parsedData = jwt_decode(data.token);
          } catch (err) {
            dispatch(userRegistrationFailure(err));
          }
          if (data && parsedData) {
            localStorage.setItem('user', JSON.stringify(parsedData));
            localStorage.setItem('token', data.token);
            dispatch(loadUserData(parsedData));
            dispatch(getUserUpdatedData());
            dispatch(userRegistered());
          } else {
            dispatch(userRegistrationFailure(data));
          }
        }
      }).catch((err) => {
        dispatch(userRegistrationFailure(err));
      });
  };
}

function sendGetUpdatedUserData(){
  return {
    type: USER_DATA_REQUEST
  }
}

function userUpdateDataFailure(){
  return {
    type: USER_DATA_REQUEST_FAILURE
  }
}

export function getUserUpdatedData() {
  return (dispatch, getState) => {
    if (isUserLoggedIn(getState())) {
      return dispatch(getUpdatedData(getState()));
    }
  };
}

function getUpdatedData(state) {
  return dispatch => {
    dispatch(sendGetUpdatedUserData());
    let headers = baseHeaders({})
    headers = authHeader(headers)
    const requestOptions = {
      method: 'GET',
      headers: headers
    };
    const userId = state.user.user.user_id || state.user.user.id
    return fetch(`/api/api/users/${userId}/`, requestOptions)
      .then(response => {
        if (!response.ok) { 
          return Promise.reject(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (!data) {
          dispatch(userUpdateDataFailure(data));
        } else {
          localStorage.setItem('user', JSON.stringify(data));
          dispatch(loadUserData(data));
        }
      });
  };
}
