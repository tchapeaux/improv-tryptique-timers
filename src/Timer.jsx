import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export class Timer {
  constructor(startTime) {
    this.startTime = startTime;
    this.accumulatedTime = 0;
    this.running = false;
  }

  hasStarted() {
    return this.running || this.accumulatedTime > 0;
  }

  getCurrentTime() {
    return (
      this.accumulatedTime + (this.running ? Date.now() - this.startTime : 0)
    );
  }

  pause() {
    this.accumulatedTime += Date.now() - this.startTime;
    this.startTime = -1;
    this.running = false;
  }

  resume() {
    this.startTime = Date.now();
    this.running = true;
  }

  reset() {
    this.startTime = -1;
    this.accumulatedTime = 0;
    this.running = false;
  }
}

const MS_IN_SECONDS = 1000;
const MS_IN_MINUTES = 1000 * 60;
const MS_IN_HOUR = 1000 * 60 * 60;

export class TimerView extends PureComponent {
  static propTypes = {
    timer: PropTypes.instanceOf(Timer).isRequired,
    onRemove: PropTypes.func.isRequired
  };

  constructor() {
    super();

    const frame = () => {
      this.forceUpdate();
      this._animationframe = window.requestAnimationFrame(frame);
    };

    this._animationframe = window.requestAnimationFrame(frame);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this._animationframe);
  }

  onToggleRunning(timer) {
    if (timer.running) {
      timer.pause();
    } else {
      timer.resume();
    }
  }

  render() {
    const { onRemove, timer } = this.props;

    const ms = timer.getCurrentTime();

    const hours = Math.floor(ms / MS_IN_HOUR);
    const minutes = Math.floor((ms - hours * MS_IN_HOUR) / MS_IN_MINUTES);
    const seconds = Math.floor(
      (ms - hours * MS_IN_HOUR - minutes * MS_IN_MINUTES) / MS_IN_SECONDS
    );

    const hh = String(hours).padStart(2, 0);
    const mm = String(minutes).padStart(2, 0);
    const ss = String(seconds).padStart(2, 0);

    const classes = classNames("timer", {
      "timer-running": timer.running
    });

    return (
      <div className={classes}>
        <span
          className="timer-time"
          onClick={this.onToggleRunning.bind(null, timer)}
        >{`${hh}:${mm}:${ss}`}</span>
        {timer.hasStarted() ? (
          <button className="button-stop" onClick={() => timer.reset()}>
            RESET
          </button>
        ) : null}
        <button className="button-delete" onClick={onRemove}>
          DELETE
        </button>
      </div>
    );
  }
}
