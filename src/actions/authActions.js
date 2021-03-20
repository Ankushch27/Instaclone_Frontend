import actionTypes from './actionTypes';

export const saveUser = (loginDispatch, token = null, userData = null) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userData', JSON.stringify(userData));
  loginDispatch({ type: actionTypes.SAVE_USER, value: {token, userData} });
};

export const logout = (loginDispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  loginDispatch({ type: actionTypes.LOGOUT });
};

export const stopLoading = (loginDispatch) => {
  loginDispatch({ type: actionTypes.STOP_LOADING });
};
