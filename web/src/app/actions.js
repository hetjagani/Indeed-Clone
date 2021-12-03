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

export function userDets(payload) {
  return {
    type: 'USER_DETAIL',
    payload,
  };
}

export function addSalary(payload) {
  return {
    type: 'ADD_SALARY',
    payload,
  };
}

export function removeSalary() {
  return {
    type: 'REMOVE_SALARY',
  };
}

export function message(payload) {
  return {
    type: 'MESSAGE',
    payload,
  };
}
