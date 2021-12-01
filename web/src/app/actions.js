export function loginRequest() {
  return {
    type: 'LOGIN_REQUEST',
  };
}

export function loginSuccess(payload) {
  return {
    type: 'LOGIN_SUCCESS',
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: 'LOGIN_FAILURE',
    payload,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function compamny(payload) {
  return {
    type: 'COMPANY',
    payload,
  };
}
