import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  authUrl: PropTypes.string.isRequired,
};

function Header({ authUrl }) {
  return (
    <div className="header">
      {"this is the hook. it's catchy. you like it."}
      <a className="logout" href={`${authUrl}/logout`}>
        logout
      </a>
    </div>
  );
}

Header.propTypes = propTypes;

export default Header;
