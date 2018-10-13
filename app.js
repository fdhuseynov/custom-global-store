require('./Store');

var reducer1InitialState = {
    count: 0
};

var reducer2InitialState = {
    time: 0
};

var appInitialState = {
    counter: reducer1InitialState,
    timer: reducer2InitialState
};

var reducer1 = function(state = reducer1InitialState, action) {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return Object.assign({}, state, { count: state.count + 1 });
        default:
            return state;
    }
}

var reducer2 = function(state = reducer2InitialState, action) {
    switch(action.type) {
        case 'INCREMENT_TIMER':
            return Object.assign({}, state, { time: state.time + 1 });
        default:
            return state;
    }
}

var store = Store();

var combinedReducers = store.combineReducers({
    reducer1,
    reducer2
});

store.createStore(combinedReducers, appInitialState);

store.dispatch({type: 'INCREMENT_COUNTER'});
console.log(store.getState());