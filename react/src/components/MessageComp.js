import React from 'react';
import { useSelector } from 'react-redux';

export default function MessageComp({ mess }) {
  const { logged, selectedUserToChat } = useSelector((state) => state.appStore);

  return (
    <div className={`w-full h-max rounded-xl p-2 flex items-end  ${mess.users[0] === logged.username ? 'flex-row-reverse' : 'flex-row'} gap-3 `}>
      <img src={mess.users[0] === logged.username ? logged.photos[0] : selectedUserToChat.photos[0]} alt='' className='w-14 h-14 rounded-full object-cover' />
      <div className={`flex flex-col ${mess.users[0] === logged.username ? 'items-end' : 'items-start'}`}>
        <p className='text-xs text-black/40'>{mess.date}</p>
        <div className={`w-max  h-12 flex items-center px-4 rounded-t-xl shadow-md ${mess.users[0] === logged.username ? 'rounded-bl-xl bg-blue-600/80 text-white' : 'rounded-br-xl bg-stone-600/20'}`}>
          {mess.message}
        </div>
      </div>
    </div>
  );
}
