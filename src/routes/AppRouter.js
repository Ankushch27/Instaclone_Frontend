import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { saveUser } from '../actions/authActions';
import { useAuthContext } from '../contexts/AuthContext';
import AuthRouter from './AuthRouter';
import HomeRouter from './HomeRouter';

const AppRouter = () => {
  const history = useHistory();
  const { loginState, loginDispatch } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (token) {
      saveUser(loginDispatch, token, userData);
      history.push('/');
    } else history.push('/login');
  }, [history, loginDispatch, loginState.userToken]);

  return <div>{loginState.userToken ? <HomeRouter /> : <AuthRouter />}</div>;
};

export default AppRouter;
