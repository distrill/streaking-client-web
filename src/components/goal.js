import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Card } from 'react-materialize';

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function buildCardAction(color, icon) {
  return (
    <Button className={`goal-card-action ${color}`}>
      <Icon>{icon}</Icon>
    </Button>
  );
}

function Goal({ name, description, id, onClick, color }) {
  const classes = ['goal', 'grey', 'lighten-5'];
  return (
    <Card
      className={classes.join(' ')}
      title={name}
      actions={[
        buildCardAction(color, 'edit'),
        buildCardAction(color, 'color_lens'),
        buildCardAction(color, 'delete'),
      ]}
      onClick={() => onClick(id)}
    >
      <p>{description}</p>
    </Card>
  );
}

Goal.propTypes = propTypes;

export default Goal;
