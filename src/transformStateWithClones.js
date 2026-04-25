'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = state;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    let nextState;

    if (type === 'clear') {
      nextState = {};
    } else if (type === 'addProperties') {
      nextState = { ...currentState, ...extraData };
    } else if (type === 'removeProperties') {
      nextState = { ...currentState };

      for (const key of keysToRemove) {
        delete nextState[key];
      }
    }

    history.push(nextState);
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
