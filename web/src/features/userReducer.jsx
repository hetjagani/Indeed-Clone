const initialState = {
  user: {},
  token: '',
  errMsg: '',
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
      return { ...state, user: null };
    case 'REMOVE_TOKEN':
      return { ...state, token: '' };
    case 'USER_DETAIL':
      return { ...state, userDetail: action.payload };
    default:
      return state;
  }
};

export default reducer;
