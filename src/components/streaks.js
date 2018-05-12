import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import Streak from './streak';

const propTypes = {
  /* eslint-disable react/forbid-prop-types */
  goals: PropTypes.object,
  streaks: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
};

const defaultProps = {
  goals: {},
  streaks: {},
};

function Streaks({ goals, streaks }) {
  return (
    <div className="streaks-container">
      {Object.values(goals).length > 0 &&
        Object.values(goals).map(([goal]) => {
          const { updateInterval, id: goalId, color } = goal;
          const goalStreaks = streaks[goalId];
          const key = shortId.generate();

          return (
            <Streak
              key={key}
              goalStreaks={goalStreaks}
              goalId={goalId}
              updateInterval={updateInterval}
              color={color}
            />
          );
        })}
    </div>
  );
}

Streaks.propTypes = propTypes;
Streaks.defaultProps = defaultProps;

export default Streaks;
