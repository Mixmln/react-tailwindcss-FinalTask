import React from 'react';
import { VscSignIn } from 'react-icons/vsc';

export default function Header() {
  return (
    <div className='w-full h-max bg-slate-500'>
      <div className='container m-auto flex items-center justify-between'>
        <h3 className='py-2  font-bold text-3xl text-stone-800'>Logo</h3>
        <div className='flex gap-3 '>
          <button className='bg-slate-400 px-4 rounded transition-all hover:bg-violet-400 active:bg-violet-600 text-white font-medium active:scale-95'>Click</button>
          <button className='bg-slate-400 px-4 rounded transition-all hover:bg-violet-400 active:bg-violet-600 text-white font-medium active:scale-95'>Click</button>
          <button className='bg-slate-400 px-4 rounded transition-all hover:bg-violet-400 active:bg-violet-600 text-white font-medium active:scale-95'>Click</button>
          <VscSignIn className='text-2xl text-white hover:text-violet-400 hover:transition-all cursor-pointer active:text-violte-500 active:scale-95 '></VscSignIn>
        </div>
      </div>
    </div>
  );
}
