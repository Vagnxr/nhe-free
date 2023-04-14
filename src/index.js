import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/index';
import { store, persistor } from './store';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import './index.css';

const render = AppComponent => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<div>Loading Persist</div>} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <AppComponent />
        </MuiThemeProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot && process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  module.hot.accept('./App', () => {
    render(require('./App').default); // eslint-disable-line
  });
}

registerServiceWorker();
