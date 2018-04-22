import React, { Component } from 'react';
import rp from 'request-promise';
import Goal from './goal';
import Streak from './streak';

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
        {/* streaks */}
        {this.state.streaks.length && (
          <div className="streaks-container">
            {this.state.streaks.map(streak => (
              <Streak
                key={streak.id}
                name={streak.accumulator_key}
                updateInterval={streak.update_interval}
                start={streak.date_start}
                end={streak.date_end}
                goalId={streak.goal_id}
              />
            ))}
          </div>
        )}
        {/* goals */}
        {this.state.goals.length && (
          <div className="goals-container">
            {this.state.goals.map(goal => (
              <Goal key={goal.id} id={goal.id} name={goal.name} description={goal.description} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Container;
