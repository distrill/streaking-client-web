import React, { Component } from 'react';
import rp from 'request-promise';
import { groupBy, flatten, maxBy, omit, without, sample } from 'lodash';
import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';
import shortId from 'shortid';
import moment from 'moment';
import Goal from './goal';
import GoalStreak from './goal_streak';
import AddGoalModal from './add_goal_modal';

const colors = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  // 'brown',
  'grey',
  'blue-grey',
];

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

function writeStreak(streak, method) {
  return rp({
    uri: 'http://localhost:3000/users/2/streaks',
    json: true,
    method,
    body: snakeCaseKeys(streak),
  });
}

function createNewStreak(streak) {
  return writeStreak(omit(streak, 'id'), 'POST');
}

function updateStreak(streak) {
  return writeStreak(streak, 'PUT');
}

function today() {
  return moment().format('YYYY-MM-DD');
}

function yesterday() {
  return moment()
    .subtract(1, 'day')
    .format('YYYY-MM-DD');
}

function isOngoing({ dateEnd: date, interval } = {}) {
  if (!date) return false;
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
    this.createGoal = this.createGoal.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
  }

  async componentDidMount() {
    const userData = await fetchUserData();
    this.setState(userData);
  }

  getColor() {
    const goals = flatten(Object.values(this.state.goals));
    const currentColors = goals.map(goal => goal.color);
    if (currentColors.length === colors.length) return sample(colors);
    return sample(without(colors, currentColors));
  }

  async createGoal(values) {
    if (!values.color) {
      // eslint-disable-next-line no-param-reassign
      values.color = this.getColor();
    }
    await rp({
      uri: 'http://localhost:3000/users/2/goals',
      json: true,
      method: 'POST',
      body: snakeCaseKeys(values),
    });
    const userData = await fetchUserData();
    this.setState(userData);
  }

  async deleteGoal(id) {
    await rp({
      uri: `http://localhost:3000/users/2/goals/${id}`,
      json: true,
      method: 'DELETE',
    });
    const userData = await fetchUserData();
    this.setState(userData);
  }

  async handleGoalClick(goalId) {
    const streaks = this.state.streaks[goalId] || [];
    const maxStreak = maxBy(streaks, 'dateEnd');

    if (isOngoing(maxStreak)) {
      // update current streak to include today as well
      maxStreak.dateEnd = moment().format('YYYY-MM-DD');
      await updateStreak(maxStreak);
    } else {
      // there is no current streak to update,
      const newStreak = {
        dateStart: moment().format('YYYY-MM-DD'),
        dateEnd: moment().format('YYYY-MM-DD'),
        goalId,
      };
      streaks.push(newStreak);
      await createNewStreak(newStreak);
    }

    const userData = await fetchUserData();
    this.setState(userData);
  }

  render() {
    return (
      <div>
        {"this is the hook. it's catchy. you like it."}

        {/*
            streaks - stored in state keyed by goalId
            we want to retain this grouping in child component
        */}
        {Object.values(this.state.goals).length && (
          <div className="streaks-container">
            {Object.values(this.state.goals).map(([goal]) => {
              const { updateInterval, id: goalId, color } = goal;
              const streaks = this.state.streaks[goalId];
              const key = shortId.generate();
              return (
                <GoalStreak
                  key={key}
                  streaks={streaks}
                  goalId={goalId}
                  updateInterval={updateInterval}
                  color={color}
                />
              );
            })}
          </div>
        )}

        {/*
            goals - stored in state keyed by id
            we want flat array of goals
        */}
        {Object.values(this.state.goals).length && (
          <div className="goals-container">
            {flatten(Object.values(this.state.goals)).map(goal => {
              const key = shortId.generate();
              return (
                <Goal
                  key={key}
                  id={goal.id}
                  name={goal.name}
                  color={goal.color}
                  description={goal.description}
                  deleteGoal={this.deleteGoal}
                />
              );
            })}
          </div>
        )}

        {/*
            new goal
        */}
        <AddGoalModal createGoal={this.createGoal} />
      </div>
    );
  }
}

export default Container;
