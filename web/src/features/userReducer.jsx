import { setCookie } from 'react-use-cookie';

const initialState = {
  user: {},
  salary: {},
  token: '',
  errMsg: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return state;
    case 'ADDING_TOKEN':
      return { ...state, token: action.payload };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload };
    case 'LOGIN_FAILURE':
      return { ...state, errMsg: action.payload };
    case 'LOGOUT':
      setCookie('token', '', { path: '/' });
      return { ...state, user: null, token: '' };
    case 'REMOVE_TOKEN':
      return { ...state, token: '' };
    case 'ADD_SALARY':
      return { ...state, salary: action.payload };
    case 'REMOVE_SALARY':
      return { ...state, salary: null };
    default:
      return state;
  }
};

export default reducer;
