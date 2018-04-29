import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import { flatten } from 'lodash';
import shortId from 'shortid';

function whatever(start, end, updateInterval) {
  if (moment(start).isSame(moment(end), updateInterval)) return 1;
  return moment(end, 'YYYY-MM-DD').diff(moment(start, 'YYYY-MM-DD'), updateInterval);
}

function getFillIndexes({ dateStart: start, dateEnd: end, updateInterval }) {
  const chartStart = moment().subtract(6, 'months');
  const chartEnd = moment();
  const numChartIntervals = chartEnd.diff(chartStart, updateInterval);

  const startIndex = numChartIntervals - chartEnd.diff(moment(start, 'YYYY-MM-DD'), updateInterval);
  // const numDays = moment(end, 'YYYY-MM-DD').diff(moment(start, 'YYYY-MM-DD'), updateInterval);
  const numDays = whatever(start, end, updateInterval);
  console.log(numDays);

  return new Array(numDays).fill(null).map((_, i) => {
    return startIndex + i;
  });
}

const propTypes = {
  streaks: PropTypes.arrayOf(
    PropTypes.shape({
      goalId: PropTypes.number.isRequired,
      updateInterval: PropTypes.string.isRequired,
      dateStart: PropTypes.string.isRequired,
      dateEnd: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function Streak({ streaks }) {
  const chartStart = moment().subtract(6, 'months');
  const chartEnd = moment();
  const numIntervals = chartEnd.diff(chartStart, streaks[0].updateInterval);
  const { goalId } = streaks[0];
  const indexes = flatten(streaks.map(getFillIndexes));

  console.log('rendering');
  // console.log(streaks);
  console.log(indexes);
  // <a data-tip="React-tooltip"> ◕‿‿◕ </a>

  // <ReactTooltip place="top" type="dark" effect="float"/>

  return (
    <div className="streak">
      {new Array(numIntervals).fill(null).map((_, i) => {
        let className = 'streak-interval';
        if (indexes.includes(i)) {
          className += ` color-${goalId} color-${goalId}-text`;
        }
        const label = chartStart.add(1, streaks[0].updateInterval).format('YYYY-MM-DD');
        const key = shortId.generate();
        return (
          <div key={key} className={className}>
            <a data-tip={label} href="/#">
              .
            </a>
            <ReactTooltip place="top" type="dark" effect="float" />
          </div>
        );
      })}
    </div>
  );
}

Streak.propTypes = propTypes;

export default Streak;
