export function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function checkPassword(password) {
  let validEmail = password.length >= 8;
  validEmail = validEmail && !isNumeric(password);
  return validEmail;
}