import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { saveUser } from '../actions/authActions';
import { useAuthContext } from '../contexts/AuthContext';

const Login = () => {
  const { loginDispatch } = useAuthContext();
  const login = async (values, setSubmitting) => {
    let res = await axios.post(
      '/login',
      {
        email: values.email,
        password: values.password,
      },
      {
        validateStatus: () => true,
      }
    );
    const {user, token} = res.data
    saveUser(loginDispatch, token, user)
    // console.log('res', res);
    // .catch((e) => console.log('e', e.response));
    setSubmitting(false);
  };
  return (
    <div>
      <div className="card">
        <h3 className="brand-logo">Instagram</h3>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            login(values, setSubmitting);
          }}>
          {({ isSubmitting }) => (
            <Form>
              <div className="input-container">
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="input-container">
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Log in
              </button>
              <div className="">
                <p>
                  Don't have an account?{' '}
                  <span>
                    <Link to="/signup">Sign up</Link>
                  </span>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
