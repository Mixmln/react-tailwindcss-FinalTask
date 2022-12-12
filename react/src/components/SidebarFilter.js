import React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import MainContext from '../context/MainContext';
import { resetValues, setAge, setCity, setError, setGender } from '../store/appStore';

export default function SidebarFilter() {
  const { socket, dispatch } = useContext(MainContext);

  const { age, city, gender, logged } = useSelector((state) => state.appStore);

  const saveFilter = () => {
    const data = {
      name: logged.username,
      city,
      gender,
      age,
    };
    if (gender === '') {
      dispatch(setError('All fields should be picked'));
      return;
    }
    socket.emit('saveFilter', data);
    dispatch(resetValues());
  };

  return (
    <div className='w-full p-2 flex flex-col gap-3'>
      <form className='flex flex-col px-12 rounded-lg border box-border gap-10 py-12'>
        <div className='flex items-center justify-between flex-col gap-3'>
          <label className='text-xl font-semibold text-neutral-900'>City: </label>
          <select className='w-full px-4 py-2 bg-slate-400 rounded-lg text-white' onChange={(e) => dispatch(setCity(e.target.value))}>
            <option value='All'>All cities</option>
            <option value='Vilnius'>Vilnius</option>
            <option value='Kaunas'>Kaunas</option>
            <option value='Siauliai'>Siauliai</option>
            <option value='Klaipeda'>Klaipeda</option>
            <option value='Marijampole'>Marijampole</option>
          </select>
        </div>
        <div className='flex items-center justify-between flex-col gap-3'>
          <label className='text-xl font-semibold text-neutral-900'>Gender: </label>
          <div className='flex w-11/12 justify-between'>
            <div className='flex items-center gap-1 font-semibold text-zinc-600'>
              <label htmlFor='gender'>Male</label>
              <input type='radio' name='gender' id='male' value='Male' onChange={(e) => dispatch(setGender(e.target.value))} />
            </div>
            <div className='flex items-center gap-1 font-semibold text-zinc-600'>
              <label htmlFor='gender'>Female</label>
              <input type='radio' name='gender' id='female' value='Female' onChange={(e) => dispatch(setGender(e.target.value))} />
            </div>
            <div className='flex items-center gap-1 font-semibold text-zinc-600'>
              <label htmlFor='gender'>No matter</label>
              <input type='radio' name='gender' id='other' value='Other' onChange={(e) => dispatch(setGender(e.target.value))} />
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between flex-col gap-3 relative'>
          <label className='text-xl font-semibold text-neutral-900'>Age: {age}</label>
          <input
            className='form-range appearance-none w-full h-1 p-0 bg-orange-500 focus:outline-none ring-1 focus:shadow-none'
            type='range'
            min={18}
            max={70}
            step={1}
            onChange={(e) => dispatch(setAge(e.target.value))}
          />
        </div>
      </form>
      <button className='px-4 py-2 w-8/12 m-auto shadow bg-orange-300 rounded-2xl hover:scale-95 active:bg-orange-400 active:scale-105 transition-all' onClick={saveFilter}>
        Save filter
      </button>
    </div>
  );
}
