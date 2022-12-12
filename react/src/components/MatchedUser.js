import React from 'react';
import { useContext } from 'react';

import MainContext from '../context/MainContext';
import { setSelectedUserToPreview, setUserPreviewTrigger } from '../store/appStore';

export default function MatchedUser({ user }) {
  const { dispatch } = useContext(MainContext);

  const seeUser = () => {
    dispatch(setUserPreviewTrigger(true));
    dispatch(setSelectedUserToPreview(user));
  };

  return (
    <div className='border-2 p-px border-orange-700 rounded-xl w-32 h-36  hover:scale-95 transition-all bg-orange-500/50 cursor-pointer shadow-2xl relative' onClick={seeUser}>
      <img className='w-full h-full object-cover rounded-xl shadow-inner' src={user.photos[0]} alt='' />
      <p className='absolute bottom-1 left-2 font-bold text-white'>{user.username}</p>
    </div>
  );
}
