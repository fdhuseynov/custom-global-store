require('./Store');


/**
 * 
 * TEST APP FOR THE STORE LIB
 * 
 */


 /** Initial state for the counter reducer. */
var counterInitialState = {
    count: 0
};

/** Initial state for the timer reducer */
var timerInitialState = {
    time: 0
};

/** Global initial state for passing to the createStore function */
var appInitialState = {
    counter: counterInitialState,
    timer: timerInitialState
};

/** Counter reducer */
var counter = function(state = counterInitialState, action) {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return Object.assign({}, state, { count: state.count + 1 });
        case 'DECREMENT_COUNTER':
            return Object.assign({}, state, { count: state.count - 1 });
        default:
            return state;
    }
}

/** Timer reducer */
var timer = function(state = timerInitialState, action) {
    switch(action.type) {
        case 'INCREMENT_TIMER':
            return Object.assign({}, state, { time: state.time + 1 });
        case 'DECREMENT_TIMER':
            return Object.assign({}, state, { time: state.time - 1});
        default:
            return state;
    }
}

/** Init the store. */
var store = Store();

/** Combine the 2 reducers into a single object. */
var combinedReducers = store.combineReducers({
    counter,
    timer
});

/** Create the store. */
store.createStore(combinedReducers, appInitialState);
console.log('\nAFTER CREATE STORE:');
console.log(store.getState());

/** Dispatch actions and show result state. */
store.dispatch({ type: 'INCREMENT_COUNTER' });
console.log('\nAFTER INCREMENT_COUNTER:');
console.log(store.getState())

store.dispatch({ type: 'INCREMENT_TIMER' });
console.log('\nAFTER INCREMENT_TIMER:');
console.log(store.getState());

store.dispatch({ type: 'INCREMENT_TIMER' });
console.log('\nAFTER INCREMENT_TIMER:');
console.log(store.getState());

store.dispatch({ type: 'DECREMENT_TIMER' });
console.log('\nAFTER DECREMENT_TIMER:');
console.log(store.getState());

console.log();