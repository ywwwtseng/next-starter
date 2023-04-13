# Data Flow - Context API

```js
//@ts-nocheck
import React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

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

export const actionCreator = {
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
  const action = React.useCallback(() => mapDispatchToActions(dispatch)(actionCreator), []);

  return (
    <GlobalContext.Provider value={{ state, action }}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalAction = () => {
  return useContextSelector(GlobalContext, v => v.action);
};

export const useGlobalSelector = (selector) => {
  return useContextSelector(GlobalContext, v => selector);
};


/**
 * Sample Code
 * 
 * function SignInDialog() {
 *    cosst user = useGlobalSelector(v => v.state.user);
 *    const action = useGlobalAction();
 * 
 *    const onSignIn = React.useCallback((user) => {
 *      action.setUser(user);
 *    }, []);
 * 
 *    return (...);
 * }
 */
```