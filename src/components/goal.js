import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

function Goal({ name, description, id }) {
  return (
    <div className={`goal color-${id}`}>
      <div className="goal-name">{name}</div>
      <div className="goal-description">{description}</div>
    </div>
  );
}

Goal.propTypes = propTypes;

export default Goal;
