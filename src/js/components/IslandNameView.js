import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeName } from '../actions/game';

const IslandNameView = () => {
  const name = useSelector(state => state.island.name);
  const title = useSelector(state => state.island.title);
  const dispatch = useDispatch();

  const changeFn = () => {
    const toName = prompt('Enter name');
    if (toName) {
      dispatch(changeName(toName.substring(0, 100)));
    }
  }

  return (
    <div className='title'>
      <h2>{name} <button onClick={changeFn}>Change Name</button></h2>
      <h4>{title}</h4>
    </div>
  )
};

export default IslandNameView;
