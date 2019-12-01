import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTimeFactor } from '../../actions/cheats';

const TimeFactor = () => {
  const dispatch = useDispatch();
  const [timeFactor, setTf] = useState(1);

  const handleSubmit = (event) => {
    dispatch(setTimeFactor(timeFactor));
    event.preventDefault();
  }

  return (
    <div className='time-factor'>
      <form onSubmit={handleSubmit}>
        <input type='number' name='timeFactor' onChange={e => setTf(e.target.value)} required></input>
        <input type='submit' value='Set time factor' />
      </form>
    </div>
  )
};

export default TimeFactor;
