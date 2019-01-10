/*
 * So, here's the deal: we need to _dinamically_ add (and maybe remove) effects
 * after the store has created (if not, thunk would be enough)
 *
 * The flow is like this:
 *
 * action => effects => store => state
 *
 */
const all = [];

export const addEffects = effects => {
  if (effects) all.push(effects);
};

/**
 * The effects redux middleware
 */
const effects = ({ dispatch, getState }) => next => action => {
  // UI is updated first (this may change)
  next(action);
  for (let i = 0; i < all.length; i++) {
    all[i](action, dispatch, getState);
  }
};

export default effects;
