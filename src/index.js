import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './js/store/store';

import './style/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Game from './js/Game';
import * as serviceWorker from './js/serviceWorker';

ReactDOM.render(
<Provider store={configureStore()}>
  <Game></Game>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
