import React, { PureComponent } from "react";

import { Timer, TimerView } from "./Timer.jsx";

import "./App.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      timers: []
    };
  }

  onAddTimer = () => {
    this.setState(prevState => ({
      timers: [...prevState.timers, new Timer(Date.now())]
    }));
  };

  onRemoveTimer = timer => {
    this.setState(prevState => ({
      timers: prevState.timers.filter(t => t !== timer)
    }));
  };

  render() {
    const { timers } = this.state;

    return (
      <div className="App">
        {timers.map((t, idx) => (
          <TimerView
            key={idx}
            onRemove={this.onRemoveTimer.bind(null, t)}
            timer={t}
          />
        ))}
        <button onClick={this.onAddTimer}>Add timer</button>
      </div>
    );
  }
}

export default App;
