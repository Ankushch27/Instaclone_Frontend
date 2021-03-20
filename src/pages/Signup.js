import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const history = useHistory()
  const signup = async (values, setSubmitting) => {
    let res = await axios.post(
      '/signup',
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        validateStatus: () => true,
      }
    );
    console.log('res', res);
    // .catch((e) => console.log('e', e.response));
    setSubmitting(false)
    if(res.status === 200) history.replace('/login')
  };

  return (
    <div>
      <div className="card">
        <h3 className="brand-logo">Instagram</h3>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            signup(values, setSubmitting);
          }}>
          {({ isSubmitting }) => (
            <Form>
              <div className="input-container">
                <Field type="text" name="name" placeholder="Full Name" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div className="input-container">
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="input-container">
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>Sign up</button>
              <div className="">
                <p>
                  Have an account?{' '}
                  <span>
                    <Link to="/login">Log in</Link>
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

export default Signup;
