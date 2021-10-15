import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';

import './index.css';
import App from './components/App/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './redux/reducers/rootReducer';
import { history } from './utils/history';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
