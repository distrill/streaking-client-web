import React, { Component } from 'react';
import rp from 'request-promise';
import { groupBy } from 'lodash';
import camelcaseKeys from 'camelcase-keys';
import shortId from 'shortid';
import Goal from './goal';
import GoalStreak from './goal_streak';

async function fetchUserData() {
  const options = {
    uri: 'http://localhost:3000/users/2',
    json: true,
  };
  return rp(options).then(userInfo => {
    const { goals, streaks } = userInfo;

    const goalStreaks = Object.values(groupBy(camelcaseKeys(streaks), 'goalId'));

    return { goals, goalStreaks };
  });
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      goalStreaks: [],
    };
  }

  async componentDidMount() {
    const userData = await fetchUserData();
    this.setState(userData);
  }

  render() {
    return (
      <div>
        {"this is the hook. it's catchy. you like it."}

        {/* streaks */}
        {this.state.goalStreaks.length && (
          <div className="streaks-container">
            {this.state.goalStreaks.map(streaks => {
              const key = shortId.generate();
              return <GoalStreak key={key} streaks={streaks} />;
            })}
          </div>
        )}

        {/* goals */}
        {this.state.goals.length && (
          <div className="goals-container">
            {this.state.goals.map(goal => {
              const key = shortId.generate();
              return (
                <Goal key={key} id={goal.id} name={goal.name} description={goal.description} />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Container;
