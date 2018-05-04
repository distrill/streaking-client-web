import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Goal({ name, description, id, onClick }) {
  return (
    <Button className={`goal color-${id}`} onClick={() => onClick(id)} waves="light">
      {name}
      <br />
      {description}
    </Button>
  );
}

Goal.propTypes = propTypes;

export default Goal;
