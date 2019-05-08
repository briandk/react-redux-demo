import React from "react";
import ReactDOM from "react-dom";
import { store, increment } from "./store";

const connect = (specifyStateIWant, specifyBehaviorIWant) => {
  return class ConnectedToStore extends React.Component {
    constructor() {
      super();
      this.state = store.getState();
    }

    componentDidMount() {
      this.functionToCallWhenWeWantToUnsubscribe = store.subscribe(() => {
        this.setState(store.getState());
      });
    }

    componentWillUnmount() {
      this.functionToCallWhenWeWantToUnsubscribe();
    }
  };

  render = () => {
    const stateIwant = specifyStateIWant(this.state);
    const behaviorIwant = specifyBehaviorIWant(store.dispatch);
    return <SomeComponent {...stateIwant} {...behaviorIwant} />;
  };
};

const Counter = props => {
  const { count, clickHandler } = props;
  return (
    <div id="container">
      <div id="counter">
        <h1>{count}</h1>
        <button onClick={clickHandler}>Increment</button>
      </div>
    </div>
  );
};

const specifyStateIwantForCounter = state => {
  return { count: state.count };
};

const specifyBehaviorIWant = dispatch => {
  return {
    clickHandler: () => {
      dispatch(increment());
    }
  };
};

const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

// Suppose <BirthdayCounter> is a component

const ConnectedBirthdayCounter = connect(
  mapStateToProps, // These are the arguments we passed originally into ConnectComponent
  mapDispatchToProps
)(BirthdayCounter)

const MyApp = () => {
  return(
    <div>
      <ConnectedCounter></ConnectedCounter>
    </div>
    <div>
      <ConnectedBirthdayCounter></ConnectedBirthdayCounter>
    </div>
  )
}

ReactDOM.render(<MyApp />, document.getElementById("app"));
