import React from 'react';
import { Redirect } from 'react-router';
import Navbar from '../components/Navbar';
import getLoginDetails from './getLoginDetails';

const withAuth = (WrappedComponent, ar, withNav) => (props) => {
  const { role } = getLoginDetails();

  if (!role) {
    return <Redirect to="/login" />;
  }
  if (role === 'employer' && ar === 'employer') {
    return withNav ? (
      <>
        <Navbar />
        <WrappedComponent {...props} />
      </>
    ) : (
      <WrappedComponent {...props} />
    );
  }
  if (role === 'user' && ar === 'user') {
    return withNav ? (
      <>
        <Navbar />
        <WrappedComponent {...props} />
      </>
    ) : (
      <WrappedComponent {...props} />
    );
  }
  if (ar === 'any') {
    return withNav ? (
      <>
        <Navbar />
        <WrappedComponent {...props} />
      </>
    ) : (
      <WrappedComponent {...props} />
    );
  }
  return <Redirect to="/" />;
};

export default withAuth;
