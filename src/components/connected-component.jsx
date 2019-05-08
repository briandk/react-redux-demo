import React from "react";
import { store } from "../store.js";

const connect = (component, stateThatIWant, behaviorThatIWant) {

}

export class BirthdayCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    // Subscribing to the store returns a callback that unsubscribes us from the store
    this.functionToUnsubscribe = store.subscribe(() => {
      this.setState({ counter: store.getState() });
    });
  }

  componentWillUnmount() {
    this.functionToUnsubscribe();
  }

  handleClick = () => {
    store.dispatch({ type: "INCREMENT" });
  };

  render() {
    return (
      <div id="counter">
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}
