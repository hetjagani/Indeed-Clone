import { setCookie } from 'react-use-cookie';

const initialState = {
  user: {},
  salary: {},
  token: '',
  errMsg: '',
  company: {},
  userDetail: '',
  message: '',
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
      return {
        ...state, user: null, token: '', company: null, userDetail: '',
      };
    case 'REMOVE_TOKEN':
      return { ...state, token: '' };
    case 'ADD_SALARY':
      return { ...state, salary: action.payload };
    case 'REMOVE_SALARY':
      return { ...state, salary: null };
    case 'COMPANY':
      return { ...state, company: action.payload };
    case 'USER_DETAIL':
      return { ...state, userDetail: action.payload };
    case 'MESSAGE':
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default reducer;
