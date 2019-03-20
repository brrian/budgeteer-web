import React, { Component } from 'react';
import CountUp from 'react-countup';

interface CounterProps {
  duration: number;
  prefix: string;
  number: number;
}

interface CounterState {
  start: number;
  end: number;
}

export default class Counter extends Component<CounterProps, CounterState> {
  static defaultProps = {
    duration: 1,
    prefix: '',
  };

  state: CounterState = {
    start: this.props.number,
    end: this.props.number,
  };

  shouldComponentUpdate = (
    nextProps: CounterProps,
    nextState: CounterState
  ) => {
    return (
      this.props.number !== nextProps.number ||
      this.state.start !== nextState.start ||
      this.state.end !== nextState.end
    );
  };

  componentDidUpdate = (prevProps: CounterProps) => {
    if (this.props.number !== prevProps.number) {
      this.setState({
        start: prevProps.number,
        end: this.props.number,
      });
    }
  };

  render() {
    const { duration, prefix } = this.props;
    const { start, end } = this.state;

    return (
      <CountUp
        duration={duration}
        end={end}
        formattingFn={num => `${prefix}${num.toLocaleString()}`}
        redraw={true}
        start={start}
      />
    );
  }
}
