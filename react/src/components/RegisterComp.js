import React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import MainContext from '../context/MainContext';
import { postReq } from '../helpers/http';
import { changeAuthPage, setAge, setCity, setError, setGender, setPassOne, setPassTwo, setUsername } from '../store/appStore';

export default function RegisterComp() {
  const { dispatch } = useContext(MainContext);

  const { username, passOne, passTwo, city, gender, age, errorMessage } = useSelector((state) => state.appStore);

  const resetStates = () => {
    dispatch(setUsername(''));
    dispatch(setPassOne(''));
    dispatch(setPassTwo(''));
    dispatch(setCity(''));
    dispatch(setGender(''));
    dispatch(setAge(''));
  };

  const handleForm = async () => {
    const user = {
      username,
      passOne,
      passTwo,
      city,
      gender,
      age,
    };
    if (username === '' || passOne === '' || passTwo === '' || city === '' || gender === '' || age === '') {
      dispatch(setError('All inputs are required'));
      return;
    }
    dispatch(setError(''));
    const res = await postReq(user, 'register');
    if (!res.error) {
      dispatch(setError(''));
      alert(res.message);
      dispatch(changeAuthPage());
      resetStates();
    } else {
      dispatch(setError(res.message));
    }
  };

  return (
    <div className='py-10 px-36'>
      <h2 className='font-semibold text-4xl text-gray-600 tracking-wider mb-4'>Register</h2>
      <form className='flex flex-col px-12  bg-slate-100 rounded-lg border box-border gap-10 py-12'>
        {errorMessage && <h3 className='font-lg text-red-600'>{errorMessage}</h3>}
        <div className='flex items-center justify-between'>
          <label className='text-xl font-semibold text-neutral-900'>Username: </label>
          <input
            className='w-5/12 px-4 py-2 bg-slate-400 rounded-lg text-white placeholder:text-white caret-orange-400'
            type='text'
            placeholder='Enter username...'
            onChange={(e) => dispatch(setUsername(e.target.value))}
          />
        </div>
        <div className='flex items-center justify-between'>
          <label className='text-xl font-semibold text-neutral-900'>Password: </label>
          <input
            className='w-5/12 px-4 py-2 bg-slate-400 rounded-lg text-white placeholder:text-white caret-orange-400'
            type='password'
            placeholder='Enter Password...'
            onChange={(e) => dispatch(setPassOne(e.target.value))}
          />
        </div>
        <div className='flex items-center justify-between'>
          <label className='text-xl font-semibold text-neutral-900'>Repeat Pass: </label>
          <input
            className='w-5/12 px-4 py-2 bg-slate-400 rounded-lg text-white placeholder:text-white caret-orange-400'
            type='password'
            placeholder='Repeat Password...'
            onChange={(e) => dispatch(setPassTwo(e.target.value))}
          />
        </div>
        <div className='flex items-center justify-between'>
          <label className='text-xl font-semibold text-neutral-900'>City: </label>
          <select className='w-5/12 px-4 py-2 bg-slate-400 rounded-lg text-white' onChange={(e) => dispatch(setCity(e.target.value))}>
            <option value='none' disabled>
              Select a city
            </option>
            <option value='Vilnius'>Vilnius</option>
            <option value='Kaunas'>Kaunas</option>
            <option value='Siauliai'>Siauliai</option>
            <option value='Klaipeda'>Klaipeda</option>
            <option value='Marijampole'>Marijampole</option>
          </select>
        </div>
        <div className='flex items-center justify-between'>
          <label className='text-xl font-semibold text-neutral-900'>Gender: </label>
          <div className='flex w-5/12 justify-between'>
            <div className='flex items-center gap-1 font-semibold text-zinc-600'>
              <label htmlFor='gender'>Male</label>
              <input type='radio' name='gender' id='male' value='Male' onChange={(e) => dispatch(setGender(e.target.value))} />
            </div>
            <div className='flex items-center gap-1 font-semibold text-zinc-600'>
              <label htmlFor='gender'>Female</label>
              <input type='radio' name='gender' id='female' value='Female' onChange={(e) => dispatch(setGender(e.target.value))} />
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <label className='text-xl font-semibold text-neutral-900'>Age: </label>
          <input
            className='w-5/12 px-4 py-2 bg-slate-400 rounded-lg text-white placeholder:text-white caret-orange-400 '
            type='number'
            placeholder='Enter age...'
            onChange={(e) => dispatch(setAge(e.target.value))}
          />
        </div>
      </form>
      <div className='flex justify-around mt-4'>
        <button className='transition-all px-20 py-3 rounded-2xl bg-stone-400 text-white font-semibold hover:bg-stone-500 active:bg-stone-600' onClick={handleForm}>
          Sign Up
        </button>
        <button className='px-20 py-3 rounded-2xl bg-orange-200 text-white font-semibold hover:bg-orange-300 active:bg-orange-400 transition-all' onClick={() => dispatch(changeAuthPage())}>
          Login
        </button>
      </div>
    </div>
  );
}
