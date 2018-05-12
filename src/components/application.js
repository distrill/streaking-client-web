import React from 'react';
import PropTypes from 'prop-types';
import Goals from './goals';
import Streaks from './streaks';
import CreateGoal from './create_goal';
import NoContent from './no_content';

const propTypes = {
  /* eslint-disable react/forbid-prop-types */
  goals: PropTypes.object,
  streaks: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
  isFetching: PropTypes.bool.isRequired,
  deleteGoal: PropTypes.func.isRequired,
  handleGoalClick: PropTypes.func.isRequired,
  createGoal: PropTypes.func.isRequired,
  updateGoal: PropTypes.func.isRequired,
};

const defaultProps = {
  goals: {},
  streaks: {},
};

function Application({
  goals,
  streaks,
  isFetching,
  deleteGoal,
  handleGoalClick,
  createGoal,
  updateGoal,
}) {
  return (
    <div className={`application ${isFetching ? 'hide' : ''}`}>
      <Streaks goals={goals} streaks={streaks} />
      <Goals
        goals={goals}
        deleteGoal={deleteGoal}
        updateGoal={updateGoal}
        handleGoalClick={handleGoalClick}
      />
      <CreateGoal handleSubmit={createGoal} />
      <NoContent goalsLength={Object.values(goals).length} />
    </div>
  );
}

Application.propTypes = propTypes;
Application.defaultProps = defaultProps;

export default Application;
