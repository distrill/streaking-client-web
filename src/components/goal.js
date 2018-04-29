import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Goal({ name, description, id, onClick }) {
  return (
    <button className={`goal color-${id}`} onClick={() => onClick(id)}>
      <div className="goal-name">{name}</div>
      <div className="goal-description">{description}</div>
    </button>
  );
}

Goal.propTypes = propTypes;

export default Goal;
