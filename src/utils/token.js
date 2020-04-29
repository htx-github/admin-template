// import md5 from 'md5';

// const salt = 'Kit-Admin';
// const tokenKey = md5(salt + '-token');
const tokenKey = `token`;
export function getToken() {
  return sessionStorage.getItem(tokenKey);
}

export function setToken(token) {
  sessionStorage.setItem(tokenKey, token);
}

export function removeToken() {
  sessionStorage.removeItem(tokenKey);
}
