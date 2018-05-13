import React, { Component } from 'react';
import { merge, flatten, maxBy, without, sample } from 'lodash';
import moment from 'moment';
import LoadingOverlay from './loading_overlay';
import Header from './header';
import Application from './application';
import { baseColors } from './../config';
import {
  fetchUserData,
  createNewGoal,
  updateGoal,
  deleteGoal,
  createNewStreak,
  updateStreak,
} from './../api';
import { isOngoing } from './../util';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: {},
      streaks: {},
      isFetching: true,
    };

    this.newStreakDay = this.newStreakDay.bind(this);
    this.createGoal = this.createGoal.bind(this);
    this.updateGoal = this.updateGoal.bind(this);
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
    if (currentColors.length === baseColors.length) return sample(baseColors);
    return sample(without(baseColors, currentColors));
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

  async updateGoal(goal) {
    await updateGoal(goal);
    const userData = await fetchUserData();
    this.setState(userData);
  }

  async deleteGoal(id) {
    await deleteGoal(id);
    const userData = await fetchUserData();
    this.setState(userData);
  }

  async newStreakDay(goalId) {
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
        <Header />

        <Application
          goals={this.state.goals}
          streaks={this.state.streaks}
          isFetching={this.state.isFetching}
          createGoal={this.createGoal}
          updateGoal={this.updateGoal}
          deleteGoal={this.deleteGoal}
          newStreakDay={this.newStreakDay}
        />

        <LoadingOverlay isFetching={this.state.isFetching} />
      </div>
    );
  }
}

export default Container;
