module.exports = (function(global) {

    /** Global state. */
    var storeState;

    /** Store's reducers. */
    var storeReducers;

    /**
     * Initializes the store.
     * 
     * @param {function || object} reducers 
     * @param {object?} initialState 
     * @returns {Store.init}
     */
    var Store = function() {
        return new Store.init();
    }

    /**
     * Store's prototype holds all public functions.
     */
    Store.prototype = {

        /**
         * Creates the store.
         * 
         * @param {object || function} reducers 
         * @param {object} initialState 
         */
        createStore: function(reducers, initialState) {
            if (reducers) {
                if (typeof reducers == 'object') {
                    storeReducers = reducers;
                } else if (typeof reducers == 'function') {
                    var functionName = reducers.name;
                    storeReducers = { functionName: reducers };
                }
            } else {
                throw Error('[Store] => createStore(): {reducers} must be either an object or a function');
            }
    
            if (initialState) {
                if (typeof initialState == 'object') {
                    storeState = initialState;
                } else {
                    throw Error('[Store] => createStore(): {initialState} must be an object.');
                }
            }
        },

        /**
         * Combines all the reducers into a single object.
         */
        combineReducers: function(reducers) {
            if (typeof reducers != 'object') {
                throw Error('[Store] => combineReducers(): function accepts only object as a parameter.');
            }

            var result = {};
            for (prop in reducers) {
                var func = reducers[prop];
                if (typeof func != 'function') {
                    throw Error('[Store] => combineReducers(): all reducers must be functions');
                }
                result[prop] = reducers[prop];
            }
            return result;
        },

        /**
         * Dispatches the reducers with given action.
         * 
         * @param {object} action 
         */
        dispatch: function(action) {
            if (action.type) {
                for (reducer in storeReducers) {
                    console.log('STORE: ' + storeState[reducer]);
                    Store.mutateState(storeReducers[reducer](storeState[reducer], action));
                }
            } else {
                throw Error('[Store] => dispatch(): {action} object must have a {type} property');
            }
        },

        /**
         * Returns the copy of the current store.
         * 
         * @returns {object}
         */
        getState: function() {
            return Object.assign({}, storeState);
        }

    };

    /**
     * Constructor for store initialization.
     * 
     * @param {function || object} reducers
     * @param {object?} initialState
     */
    Store.init = function() {
        storeReducers = {};
        storeState = {};
    }

    /**
     * The only function that can mutate the global state.
     * 
     * @param {object} newState
     */
    Store.mutateState = function(newState) {
        storeState = Object.assign({}, storeState, newState);
    }

    Store.init.prototype = Store.prototype;

    global.Store = Store;

})(global);