import React from 'react';
import { authUrl } from './../config';

function Header() {
  return (
    <div className="header">
      <img className="nav-logo" src="logo_side.png" alt="streaking man" />
      <a className="logout" href={`${authUrl}/logout`}>
        logout
      </a>
    </div>
  );
}

export default Header;
