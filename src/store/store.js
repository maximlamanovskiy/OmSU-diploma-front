import createSagaMiddleware from 'redux-saga';

import { createStore, applyMiddleware } from 'redux';
import { syncTranslationWithStore } from 'react-redux-i18n';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import appReducer from 'src/reducers/rootReducer';
import appSaga from 'src/sagas/rootSaga';

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  appReducer,
  applyMiddleware(...[sagaMiddleware, routerMiddleware(history)])
);

sagaMiddleware.run(appSaga);
syncTranslationWithStore(store);

export { history };
export default store;
