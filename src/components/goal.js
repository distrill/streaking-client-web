import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Card } from 'react-materialize';
import shortId from 'shortid';
import EditGoal from './edit_goal';

const propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  updateGoal: PropTypes.func.isRequired,
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

function Goal({ goal, updateGoal, deleteGoal, newStreakDay }) {
  const classes = ['grey', 'lighten-5'];

  const { id, name, description, color } = goal;
  const modalId = `goal-modal-${id}`;

  function openEditModal() {
    // ew. jquery is required by react-materialize.
    // see https://react-materialize.github.io/#/modals
    // eslint-disable-next-line no-undef
    $(`#${modalId}`).modal('open');
  }

  return (
    <div className="goal">
      <Card
        className={classes.join(' ')}
        title={name}
        actions={[
          buildCardAction(color, 'edit', () => openEditModal()),
          buildCardAction(color, 'color_lens', () => console.log('whatever')),
          buildCardAction(color, 'delete', () => deleteGoal(id)),
          buildCardAction(color, 'add_to_photos', () => newStreakDay(id)),
        ]}
      >
        <p>{description}</p>
      </Card>
      <EditGoal
        handleSubmit={updateGoal}
        goal={goal}
        triggerButton={null}
        modalId={modalId}
        actionButtonLabel="update"
      />
    </div>
  );
}

Goal.propTypes = propTypes;

export default Goal;
