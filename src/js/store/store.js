import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root-reducer';
import INITIAL_STATE from './initial-state';

export default function configureStore(initialState=INITIAL_STATE) {
  const saveState = localStorage.getItem('save');
  if (saveState) {
    initialState = JSON.parse(atob(prompt('Enter load data')));
  }
  if (!initialState) {
    initialState = INITIAL_STATE;
  }
 return createStore(
   rootReducer,
   initialState,
   applyMiddleware(thunk) && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
}
