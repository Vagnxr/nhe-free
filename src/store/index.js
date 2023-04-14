/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storageSession from 'redux-persist/lib/storage/session';

import { reducers } from 'modules';
import sagas from 'sagas';

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const createRootReducer = (state, action) => {
  if (action.type === 'CLEAR_STORE') {
    Object.keys(state).forEach(key => storageSession.removeItem(`persist:${key}`));
    state = undefined;
  }
  return combineReducers({
    ...reducers,
    router: connectRouter(history),
  })(state, action);
};

const persistConfig = {
  key: 'root',
  storage: storageSession,
  stateReconciler: autoMergeLevel2,
  blacklist: ['uiLightBox', 'uiAlert', 'uiNotifications'],
};

const pReducer = persistReducer(persistConfig, createRootReducer);

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process.env.REACT_APP_NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize: {
          options: {
            undefined: true,
            function: fn => fn.toString(),
          },
        },
      })
    : compose;

const middlewares = [routeMiddleware, sagaMiddleware];
if ((module.hot && process.env.NODE_ENV !== 'production') || process.env.CI == true) {
  // eslint-disable-next-line global-require
  const logger = require('redux-logger').default;
  middlewares.push(logger);
}

const store = createStore(pReducer, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(sagas);

const persistor = persistStore(store);

if (module.hot && process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  module.hot.accept('../modules', () => store.replaceReducer(reducers));
}

export { store, history, persistor };
