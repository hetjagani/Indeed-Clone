import React from 'react';
import { Redirect } from 'react-router';
import getLoginDetails from './getLoginDetails';

const withAuth = (WrappedComponent, ar) => (props) => {
  const { role } = getLoginDetails();

  if (!role) {
    return <Redirect to="/login" />;
  }
  if (role === 'employer' && ar === 'employer') {
    return <WrappedComponent {...props} />;
  }
  if (role === 'user' && ar === 'user') {
    return <WrappedComponent {...props} />;
  }
  if (ar === 'any') {
    return <WrappedComponent {...props} />;
  }
  return <Redirect to="/" />;
};

export default withAuth;
