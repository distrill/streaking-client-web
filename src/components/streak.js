import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function getFillIndexes(start, end, interval) {
  const chartStart = moment().subtract(6, 'months');
  const chartEnd = moment();
  const numChartIntervals = chartEnd.diff(chartStart, interval);

  const startIndex = numChartIntervals - chartEnd.diff(moment(start, 'YYYY-MM-DD'), interval);
  const numDays = moment(end, 'YYYY-MM-DD').diff(moment(start, 'YYYY-MM-DD'), interval);

  return new Array(numDays).fill(null).map((_, i) => {
    return startIndex + i + 1;
  });
}

const propTypes = {
  name: PropTypes.string.isRequired,
  goalId: PropTypes.number.isRequired,
  updateInterval: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

function Streak({ name, goalId, updateInterval, start, end }) {
  const chartStart = moment().subtract(6, 'months');
  const chartEnd = moment();
  const numIntervals = chartEnd.diff(chartStart, updateInterval);

  console.log('ui:', updateInterval, 'ni:', numIntervals);
  const indexes = getFillIndexes(start, end, updateInterval);
  console.log('indexes', indexes);

  return (
    <div className="streak">
      {new Array(numIntervals).fill(null).map((_, i) => {
        let className = 'streak-interval';
        if (indexes.includes(i)) {
          className += ` color-${goalId} color-${goalId}-text`;
        }
        return (
          <div key={`${goalId}-${i}`} className={className}>
            .
          </div>
        );
      })}
      {/* {name} (goal {goalId}): {start} - {end} ({updateInterval}) */}
    </div>
  );
}

Streak.propTypes = propTypes;

export default Streak;
