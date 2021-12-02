import { setCookie } from 'react-use-cookie';

const initialState = {
  user: {},
  token: '',
  errMsg: '',
  company: {},
  userDetail: '',
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
    case 'COMPANY':
      return { ...state, company: action.payload };
    case 'USER_DETAIL':
      return { ...state, userDetail: action.payload };
    default:
      return state;
  }
};

export default reducer;
