import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadGame } from '../actions/game';

const SaveLoad = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const copyState = () => {
    const saveState = btoa(JSON.stringify(state));
    navigator.clipboard.writeText(saveState).then(() => {
      alert('Saved to clipboard');
    });
  }

  const loadState = () => {
    const loadState = JSON.parse(atob(prompt('Enter load data')));
    if (!loadState) {
      alert('Invalid save state');
    } else {
      dispatch(loadGame(loadState));
    }
  }

  return (
    <div className='save-load'>
      <button onClick={copyState}>Save</button>
      <button onClick={loadState}>Load</button>
    </div>
  )
}

export default SaveLoad;
