import React from 'react';
import { authUrl } from './../config';

function Header() {
  return (
    <div className="header">
      {"this is the hook. it's catchy. you like it."}
      <a className="logout" href={`${authUrl}/logout`}>
        logout
      </a>
    </div>
  );
}

export default Header;
