import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <NavLink to="/bar/one">One</NavLink>
      <p>landing</p>
    </>
  );
}
