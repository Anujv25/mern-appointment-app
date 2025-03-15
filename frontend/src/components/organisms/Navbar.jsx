// src/components/organisms/Navbar.js
import React from 'react';
import Button from '../atoms/Button';
import InputField from '../molecules/InputField';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">MyApp</div>
    <div className="nav-links">
      <Button label="Home" />
      <Button label="About" />
      <Button label="Contact" />
    </div>
  </nav>
);

export default Navbar;
