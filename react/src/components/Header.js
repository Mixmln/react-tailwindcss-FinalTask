import React from 'react';
import { useContext } from 'react';
import { VscSignIn } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { setLogged } from '../store/appStore';
import { FaFireAlt } from 'react-icons/fa';

export default function Header() {
  const { logged } = useSelector((state) => state.appStore);

  const { dispatch, socket } = useContext(MainContext);

  const nav = useNavigate();

  const logOut = () => {
    socket.emit('logout');
    dispatch(setLogged(null));
    nav('/');
  };

  return (
    <div className='w-full h-max bg-slate-500 shadow-lg'>
      <div className='container m-auto flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <FaFireAlt className='text-3xl text-rose-600 '></FaFireAlt>
          <h3 className='py-2  font-bold text-3xl text-orange-400 drop-shadow-lg'>Tinder</h3>
        </div>
        <div className='flex gap-3 items-center'>
          <button className='bg-slate-400 px-4 rounded transition-all hover:bg-orange-400 active:bg-orange-600 text-white font-medium active:scale-95 drop-shadow-lg'>Filter</button>
          <button className='bg-slate-400 px-4 rounded transition-all hover:bg-orange-400 active:bg-orange-600 text-white font-medium active:scale-95 drop-shadow-lg'>Chat</button>
          <button className='bg-slate-400 px-4 rounded transition-all hover:bg-orange-400 active:bg-orange-600 text-white font-medium active:scale-95 drop-shadow-lg'>Likes</button>
          <button className='bg-slate-400 px-4 rounded transition-all hover:bg-orange-400 active:bg-orange-600 text-white font-medium active:scale-95 drop-shadow-lg'>Profile</button>
          {logged && <VscSignIn className='text-2xl text-white hover:text-orange-400 hover:transition-all cursor-pointer active:text-violte-500 active:scale-95 ' onClick={logOut}></VscSignIn>}
          {logged && (
            <div className='flex items-center bg-slate-400 px-3 py-0.5 gap-3 rounded-xl justify-between cursor-pointer' onClick={() => nav('/profile')}>
              <img className='w-10 h-10 rounded-full object-cover' src={logged.photos[0]} alt='' />
              <p className='font-semibold text-orange-500 '>{logged.username}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
