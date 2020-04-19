import React from 'react';

const Error = ({ touched, message }) => {
  if (!touched) {
    return <p></p>;
  }
  if (message) {
    return <p>{message}</p>;
  }
  return <p></p>;
};

export default Error;
