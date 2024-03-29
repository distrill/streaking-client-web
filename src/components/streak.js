import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { flatten } from 'lodash';
import shortId from 'shortid';

function getFillIndexes({ dateStart, dateEnd }, updateInterval) {
  const intervalStart = () => moment(dateStart, 'YYYY-MM-DD').startOf(updateInterval);
  const intervalEnd = () => moment(dateEnd, 'YYYY-MM-DD');

  const numIntervals = intervalEnd().diff(intervalStart(), updateInterval) + 1; // +1 here to include today
  return new Array(numIntervals).fill(null).map((_, i) => {
    return intervalStart()
      .add(i, updateInterval)
      .startOf(updateInterval)
      .format('YYYY-MM-DD');
  });
}

const propTypes = {
  goalId: PropTypes.number.isRequired,
  updateInterval: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  goalStreaks: PropTypes.arrayOf(
    PropTypes.shape({
      dateStart: PropTypes.string.isRequired,
      dateEnd: PropTypes.string.isRequired,
    })
  ),
};

const defaultProps = {
  goalStreaks: [],
};

function Streak({ goalStreaks, updateInterval, goalId, color }) {
  const chartStart = () =>
    moment()
      .subtract(6, 'months')
      .startOf(updateInterval);
  const chartEnd = () => moment();
  const numIntervals = chartEnd().diff(chartStart(), updateInterval);
  const indexes = flatten(goalStreaks.map(streak => getFillIndexes(streak, updateInterval)));

  const intervals = new Array(numIntervals).fill(null).map((_, i) => {
    return {
      goalId,
      dateStart: chartEnd()
        .subtract(numIntervals - (i + 1), updateInterval)
        .startOf(updateInterval)
        .format('YYYY-MM-DD'),
    };
  });

  return (
    <div className="streak">
      {Object.values(intervals).map(interval => {
        const classes = ['streak-interval'];
        const colorClasses = [color, `${color}-text`];
        if (indexes.includes(interval.dateStart)) {
          classes.push(...colorClasses);
        }
        const key = shortId.generate();
        return (
          <div key={key} className={classes.join(' ')}>
            .
            {/* {interval.dateStart} */}
          </div>
        );
      })}
    </div>
  );
}

Streak.propTypes = propTypes;
Streak.defaultProps = defaultProps;

export default Streak;
