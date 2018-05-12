import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import { flatten } from 'lodash';
import Goal from './goal';

const propTypes = {
  /* eslint-disable react/forbid-prop-types */
  goals: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
  deleteGoal: PropTypes.func.isRequired,
  handleGoalClick: PropTypes.func.isRequired,
};

const defaultProps = {
  goals: {},
};

function Goals({ goals, deleteGoal, handleGoalClick }) {
  return (
    <div className="goals-container">
      {Object.values(goals).length > 0 &&
        flatten(Object.values(goals)).map(goal => {
          const key = shortId.generate();
          return (
            <Goal
              key={key}
              id={goal.id}
              name={goal.name}
              color={goal.color}
              description={goal.description}
              deleteGoal={deleteGoal}
              newStreakDay={handleGoalClick}
            />
          );
        })}
    </div>
  );
}

Goals.propTypes = propTypes;
Goals.defaultProps = defaultProps;

export default Goals;
