import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Card } from 'react-materialize';
import shortId from 'shortid';

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  deleteGoal: PropTypes.func.isRequired,
  newStreakDay: PropTypes.func.isRequired,
};

function buildCardAction(color, icon, onClick) {
  const key = shortId.generate();
  return (
    <Button key={key} className={`goal-card-action ${color}`} onClick={onClick}>
      <Icon>{icon}</Icon>
    </Button>
  );
}

function Goal({ name, description, id, color, deleteGoal, newStreakDay }) {
  const classes = ['goal', 'grey', 'lighten-5'];

  return (
    <Card
      className={classes.join(' ')}
      title={name}
      actions={[
        buildCardAction(color, 'edit', () => console.log('whatever')),
        buildCardAction(color, 'color_lens', () => console.log('whatever')),
        buildCardAction(color, 'delete', () => deleteGoal(id)),
        buildCardAction(color, 'add_to_photos', () => newStreakDay(id)),
      ]}
    >
      <p>{description}</p>
    </Card>
  );
}

Goal.propTypes = propTypes;

export default Goal;
