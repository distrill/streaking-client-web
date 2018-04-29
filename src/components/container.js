import React, { Component } from 'react';
import rp from 'request-promise';
import { groupBy, flatten, maxBy, cloneDeep } from 'lodash';
import camelCaseKeys from 'camelcase-keys';
import shortId from 'shortid';
import moment from 'moment';
import Goal from './goal';
import GoalStreak from './goal_streak';

async function fetchUserData() {
  const options = {
    uri: 'http://localhost:3000/users/2',
    json: true,
  };
  return rp(options).then(userInfo => {
    const { goals, streaks } = userInfo;

    const goalInfo = groupBy(camelCaseKeys(goals), 'id');
    const streakInfo = groupBy(camelCaseKeys(streaks), 'goalId');

    return { goals: goalInfo, streaks: streakInfo };
  });
}

function today() {
  return moment().format('YYYY-MM-DD');
}

function yesterday() {
  return moment()
    .subtract(1, 'day')
    .format('YYYY-MM-DD');
}

function isOngoing(date, interval) {
  if (date === today()) return true;
  if (date === yesterday()) return true;
  return moment(date).isSame(today(), interval);
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: {},
      streaks: {},
    };

    this.handleGoalClick = this.handleGoalClick.bind(this);
  }

  async componentDidMount() {
    const userData = await fetchUserData();
    console.log(userData);
    this.setState(userData);
  }

  handleGoalClick(goalId) {
    const streaks = this.state.streaks[goalId];
    const maxStreak = maxBy(streaks, 'dateEnd');

    const { dateEnd, interval } = maxStreak;

    if (isOngoing(dateEnd, interval)) {
      console.log('update streak');
      maxStreak.dateEnd = moment().format('YYYY-MM-DD');
    } else {
      console.log('new streak');
      streaks.push(
        Object.assign(cloneDeep(streaks[0]), {
          dateStart: moment().format('YYYY-MM-DD'),
          dateEnd: moment().format('YYYY-MM-DD'),
        })
      );
    }

    this.setState({ streaks: Object.assign({}, this.state.streaks, { [goalId]: streaks }) });
    // console.log(this.state);
  }

  render() {
    return (
      <div>
        {"this is the hook. it's catchy. you like it."}

        {/* streaks */}
        {Object.values(this.state.streaks).length && (
          <div className="streaks-container">
            {Object.values(this.state.streaks).map(streaks => {
              const key = shortId.generate();
              return <GoalStreak key={key} streaks={streaks} />;
            })}
          </div>
        )}

        {/* goals */}
        {Object.values(this.state.goals).length && (
          <div className="goals-container">
            {flatten(Object.values(this.state.goals)).map(goal => {
              const key = shortId.generate();
              return (
                <Goal
                  key={key}
                  id={goal.id}
                  name={goal.name}
                  description={goal.description}
                  onClick={this.handleGoalClick}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Container;
