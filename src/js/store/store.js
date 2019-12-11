import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root-reducer';
import INITIAL_STATE from './initial-state';

export default function configureStore(initialState=INITIAL_STATE) {
  const saveState = localStorage.getItem('save');
  let loaded = false;
  if (saveState) {
    initialState = JSON.parse(atob(saveState));
    loaded = true;
  }
  if (!loaded) {
    initialState = rootReducer(null, {type: 'RESET_SAVE'});
  }
  return createStore(
   rootReducer,
   initialState,
   applyMiddleware(thunk) && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
