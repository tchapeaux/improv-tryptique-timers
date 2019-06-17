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

  render() {
    const { timers } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {timers.map((t, idx) => (
            <TimerView key={idx} timer={t} />
          ))}
          <button onClick={this.onAddTimer}>Add timer</button>
        </header>
      </div>
    );
  }
}

export default App;
