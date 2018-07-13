export function authHeader(headers) {
  let token = localStorage.getItem('token');

  if (token) {
    headers = {
      'Authorization': 'JWT ' + token,
      ...headers
    }
  }
  return headers;
}

export function baseHeaders(headers) {
  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    ...headers
  }
  return headers;
}