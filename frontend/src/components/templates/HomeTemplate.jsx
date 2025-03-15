// src/components/templates/HomeTemplate.js
import React from 'react';
import Navbar from '../organisms/Navbar';

const HomeTemplate = ({ children }) => (
  <div className="home-template">
    <Navbar />
    <main>{children}</main>

  </div>
);

export default HomeTemplate;
