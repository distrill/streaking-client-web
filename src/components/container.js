import React, { Component } from 'react';
import rp from 'request-promise';
import { merge, groupBy, flatten, maxBy, without, sample } from 'lodash';
import moment from 'moment';
import LoadingOverlay from './loading_overlay';
import Header from './header';
import Application from './application';

// move me
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
  'grey',
  'blue-grey',
];

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://streakingapp.com';
const authUrl = process.env.REACT_APP_AUTH_URL || baseUrl;

async function fetchUserData() {
  const options = {
    uri: `${baseUrl}/api/me`,
    json: true,
  };
  return rp(options)
    .then(userInfo => {
      const { goals, streaks } = userInfo;

      const goalInfo = groupBy(goals, 'id');
      const streakInfo = groupBy(streaks, 'goalId');

      return { goals: goalInfo, streaks: streakInfo };
    })
    .catch(err => {
      console.log(err);
      window.location.href = `${authUrl}/login`;
    });
}

function createNewStreak(streak) {
  return rp({
    uri: `${baseUrl}/api/streaks`,
    json: true,
    method: 'POST',
    body: streak,
  });
}

function updateStreak(streak) {
  return rp({
    uri: `${baseUrl}/api/streaks/${streak.id}`,
    json: true,
    method: 'PUT',
    body: streak,
  });
}

function createNewGoal(goal) {
  return rp({
    uri: `${baseUrl}/api/goals`,
    json: true,
    method: 'POST',
    body: goal,
  });
}

// function updateGoal(goal) {
//   return rp({
//     uri: `${baseUrl}/api/goals/${goal.id}`,
//     json: true,
//     method: 'PUT',
//     body: snakeCaseKeys(goal),
//   });
// }

function deleteGoal(id) {
  return rp({
    uri: `${baseUrl}/api/goals/${id}`,
    json: true,
    method: 'DELETE',
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
      isFetching: true,
    };

    this.handleGoalClick = this.handleGoalClick.bind(this);
    this.createGoal = this.createGoal.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
  }

  async componentDidMount() {
    this.setState({ isFetching: true });
    const userData = await fetchUserData();
    this.setState(merge({}, userData, { isFetching: false }));
  }

  getColor() {
    const goals = flatten(Object.values(this.state.goals));
    const currentColors = goals.map(goal => goal.color);
    if (currentColors.length === colors.length) return sample(colors);
    return sample(without(colors, currentColors));
  }

  async createGoal(goal) {
    await createNewGoal(
      Object.assign({}, goal, {
        color: goal.color || this.getColor(),
      })
    );
    const userData = await fetchUserData();
    this.setState(userData);
  }

  async deleteGoal(id) {
    await deleteGoal(id);
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
        <Header authUrl={authUrl} />

        <Application
          goals={this.state.goals}
          streaks={this.state.streaks}
          isFetching={this.state.isFetching}
          deleteGoal={this.deleteGoal}
          handleGoalClick={this.handleGoalClick}
          createGoal={this.createGoal}
        />

        <LoadingOverlay isFetching={this.state.isFetching} />
      </div>
    );
  }
}

export default Container;
