import rp from 'request-promise';
import { groupBy } from 'lodash';
import { baseUrl, authUrl } from './config';

export function fetchUserData() {
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

export function createNewStreak(streak) {
  return rp({
    uri: `${baseUrl}/api/streaks`,
    json: true,
    method: 'POST',
    body: streak,
  });
}

export function updateStreak(streak) {
  return rp({
    uri: `${baseUrl}/api/streaks/${streak.id}`,
    json: true,
    method: 'PUT',
    body: streak,
  });
}

export function createNewGoal(goal) {
  return rp({
    uri: `${baseUrl}/api/goals`,
    json: true,
    method: 'POST',
    body: goal,
  });
}

export function deleteGoal(id) {
  return rp({
    uri: `${baseUrl}/api/goals/${id}`,
    json: true,
    method: 'DELETE',
  });
}
