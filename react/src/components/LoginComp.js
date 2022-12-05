import React from 'react';
import { useContext } from 'react';
import MainContext from '../context/MainContext';
import { changeAuthPage } from '../store/appStore';

export default function LoginComp() {
  const { dispatch } = useContext(MainContext);

  const handleForm = () => {};

  return (
    <div className='py-10 px-36'>
      <h2 className='font-semibold text-4xl text-gray-600 tracking-wider mb-4'>Login</h2>
      <form className='flex flex-col px-12  bg-slate-100 rounded-lg border box-border gap-10 py-12' onSubmit={handleForm}>
        <div className='flex items-center justify-between'>
          <label className='text-xl font-semibold text-neutral-900'>Username: </label>
          <input className='w-5/12 px-4 py-2 bg-slate-400 rounded-lg text-white placeholder:text-white' type='text' placeholder='Enter username...' />
        </div>
        <div className='flex items-center justify-between'>
          <label className='text-xl font-semibold text-neutral-900'>Password: </label>
          <input className='w-5/12 px-4 py-2 bg-slate-400 rounded-lg text-white placeholder:text-white' type='password' placeholder='Enter Password...' />
        </div>
      </form>
      <div className='flex justify-around mt-4'>
        <button className='transition-all px-20 py-3 rounded-2xl bg-stone-400 text-white font-semibold hover:bg-stone-500 active:bg-stone-600' onClick={handleForm}>
          Sign In
        </button>
        <button className='px-20 py-3 rounded-2xl bg-orange-200 text-white font-semibold hover:bg-orange-300 active:bg-orange-400 transition-all' onClick={() => dispatch(changeAuthPage())}>
          Register
        </button>
      </div>
    </div>
  );
}
