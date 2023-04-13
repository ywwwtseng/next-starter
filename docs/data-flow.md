# Data Flow

```js
//@ts-nocheck
import React from 'react';
import { createContext } from 'use-context-selector';

export const mapDispatchToActions = (dispatch) => (actions) => {
  return Object.entries(actions).reduce((acc, [name, func]: any) => {
    acc[name] = (...args) => dispatch(func(...args));
    return acc;
  }, {});
};

const INITIAL_STATE = {
  user: null,
};

export const SET_USER = 'GlobalContext/SET_USER';

export const actions = {
  setUser: (user) => ({ type: SET_USER, user })
};

export const GlobalContext = createContext(INITIAL_STATE);

export const globalReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children, initialState = INITIAL_STATE }) => {
  const [state, dispatch] = React.useReducer(globalReducer, initialState);
  const actions = React.useCallback(() => mapDispatchToActions(dispatch)(actions), []);

  return (
    <GlobalContext.Provider value={{ state, actions }}>{children}</GlobalContext.Provider>
  );
};


/**
 * import { useContextSelector } from 'use-context-selector';
 *
 * function SignInDialog() {
 *    cosst user = useContextSelector(GlobalContext, v => v.state.user);
 *    const setUser = useContextSelector(GlobalContext, v => v.actions.setUser);
 * 
 *    const onSignIn = React.useCallback((user) => {
 *      setUser(user);
 *    }, []);
 * 
 *    return (...);
 * }
 */
```