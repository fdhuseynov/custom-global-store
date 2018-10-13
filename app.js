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
        default:
            return state;
    }
}

/** Timer reducer */
var timer = function(state = timerInitialState, action) {
    switch(action.type) {
        case 'INCREMENT_TIMER':
            return Object.assign({}, state, { time: state.time + 1 });
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

/** Dispatch an action. */
store.dispatch({type: 'INCREMENT_COUNTER'});
console.log(store.getState());