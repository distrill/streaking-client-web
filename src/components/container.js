import React, { Component } from 'react';
import rp from 'request-promise';
import { groupBy, maxBy, merge, cloneDeep } from 'lodash';
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

    const goalStreaks = Object.values(groupBy(camelCaseKeys(streaks), 'goalId'));

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

    this.handleGoalClick = this.handleGoalClick.bind(this);
  }

  async componentDidMount() {
    const userData = await fetchUserData();
    this.setState(userData);
  }

  handleGoalClick(goalId) {
    const goalStreak = this.state.goalStreaks.find(gs => gs[0].goalId === goalId);
    console.log(goalStreak);
    // const goal = this.state.goals.find(g => g.id === goalId);
    // const maxStreak = maxBy(goal.streaks, 'dateEnd');

    // if (
    //   maxStreak.dateEnd ===
    //   moment()
    //     .subtract(1, 'day')
    //     .format('YYYY-MM-DD')
    // ) {
    //   maxStreak.dateEnd = moment().format('YYYY-MM-DD');
    // } else {
    //   goal.streaks.push(
    //     Object.assign(cloneDeep(goal.streaks[0]), {
    //       dateStart: moment().format('YYYY-MM-DD'),
    //       dateEnd: moment().format('YYYY-MM-DD'),
    //     })
    //   );
    // }
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
