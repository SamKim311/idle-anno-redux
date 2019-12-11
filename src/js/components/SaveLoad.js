import React from 'react';
import { useDispatch } from 'react-redux';

import { saveGame, loadGame, resetSave } from '../actions/game';

const SaveLoad = () => {
  const dispatch = useDispatch();

  const copyState = () => {
    dispatch(saveGame());
    const saveState = localStorage.getItem('save');
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

  const resetSaveFn = () => {
    const response = window.confirm('Are you sure you want to clear your save?');
    if (response) {
      dispatch(resetSave());
    }
  }

  return (
    <div className='save-load'>
      <button onClick={copyState}>Save</button>
      <button onClick={loadState}>Load</button>
      <button onClick={resetSaveFn}>RESET</button>
    </div>
  )
}

export default SaveLoad;
