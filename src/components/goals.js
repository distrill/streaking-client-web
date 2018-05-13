import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import { flatten } from 'lodash';
import Goal from './goal';

const propTypes = {
  /* eslint-disable react/forbid-prop-types */
  goals: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
  updateGoal: PropTypes.func.isRequired,
  deleteGoal: PropTypes.func.isRequired,
  newStreakDay: PropTypes.func.isRequired,
};

const defaultProps = {
  goals: {},
};

function Goals({ goals, updateGoal, deleteGoal, newStreakDay }) {
  return (
    <div className="goals-container">
      {Object.values(goals).length > 0 &&
        flatten(Object.values(goals)).map(goal => {
          const key = shortId.generate();
          return (
            <Goal
              key={key}
              goal={goal}
              deleteGoal={deleteGoal}
              newStreakDay={newStreakDay}
              updateGoal={updateGoal}
            />
          );
        })}
    </div>
  );
}

Goals.propTypes = propTypes;
Goals.defaultProps = defaultProps;

export default Goals;
