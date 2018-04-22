import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import rp from 'request-promise';

import './index.css';

const goalPropTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const streakPropTypes = {
  name: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  goalId: PropTypes.number.isRequired,
};

function Goal({ name, description }) {
  return (
    <div className="goal">
      <div className="goal-name">{name}</div>
      <div className="goal-description">{description}</div>
    </div>
  );
}

class Streak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whatever: '',
    };
  }

  render() {
    console.log('whatever', this.state.whatever);
    return (
      <div className="streak">
        <div className="streak-name">{this.props.name}</div>
        <div className="streak-start">{this.props.start}</div>
        <div className="streak-end">{this.props.end}</div>
        <div className="streak-goal-id">{this.props.goalId}</div>
      </div>
    );
  }
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      streaks: [],
    };
  }

  async componentDidMount() {
    const options = {
      uri: 'http://localhost:3000/users/2',
      json: true,
    };
    try {
      const userInfo = await rp(options);
      this.setState({
        goals: userInfo.goals,
        streaks: userInfo.streaks,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        {"this is the hook. it's catchy. you like it."}
        {/* goals */}
        {this.state.goals.length &&
          this.state.goals.map(goal => (
            <Goal key={goal.id} name={goal.name} description={goal.description} />
          ))}
        {/* streaks */}
        {this.state.streaks.length &&
          this.state.streaks.map(streak => (
            <div>
              <Streak
                key={streak.id}
                name={streak.accumulator_key}
                start={streak.date_start}
                end={streak.date_end}
                goalId={streak.goal_id}
              />
            </div>
          ))}
      </div>
    );
  }
}

Goal.propTypes = goalPropTypes;
Streak.propTypes = streakPropTypes;

ReactDOM.render(<Container />, document.getElementById('root'));
