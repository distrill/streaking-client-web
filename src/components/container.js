import React, { Component } from 'react';
import rp from 'request-promise';
import { groupBy } from 'lodash';
import camelCaseKeys from 'camelcase-keys';
import shortId from 'shortid';
import Goal from './goal';
import GoalStreak from './goal_streak';

async function fetchGoalData() {
  const options = {
    uri: 'http://localhost:3000/users/2',
    json: true,
  };

  const userInfo = await rp(options);
  const groupedGoals = groupBy(camelCaseKeys(userInfo.goals), 'id');
  const groupedStreaks = groupBy(camelCaseKeys(userInfo.streaks), 'goalId');

  return Object.keys(groupedGoals).reduce((accum, i) => {
    const goal = groupedGoals[i];
    const streaks = groupedStreaks[i];
    return [...accum, Object.assign({}, goal[0], { streaks })];
  }, []);
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
    };
  }

  async componentDidMount() {
    const goalData = await fetchGoalData();
    this.setState({ goals: goalData });
  }

  render() {
    return (
      <div>
        {"this is the hook. it's catchy. you like it."}

        {/* streaks */}
        {this.state.goals.length && (
          <div className="streaks-container">
            {this.state.goals.map(({ streaks }) => {
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
