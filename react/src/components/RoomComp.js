import React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import MainContext from '../context/MainContext';
import { setChatTrigger, setUserToChat } from '../store/appStore';

export default function RoomComp({ user }) {
  const { logged } = useSelector((state) => state.appStore);

  const { socket, dispatch } = useContext(MainContext);

  const openChatWith = (userObj) => {
    dispatch(setChatTrigger(true));
    dispatch(setUserToChat(userObj));
    const data = {
      users: [logged.username, userObj.username],
    };
    socket.emit('getMessages', data);
  };

  return (
    <div
      className='w-full rounded-xl active:scale-95 transition-all active:bg-amber-500/70 cursor-pointer h-28 min-h-28 flex items-center gap-7 bg-amber-500/50 shadow-lg hover:shadow-inner active:shadow-orange-500'
      onClick={() => openChatWith(user)}
    >
      <img src={user.photos[0]} alt='' className='w-24 h-24 object-cover rounded-full shadow-2xl ml-4 p-px border bg-amber-500/50' />
      <h3 className='text-xl font-semibold'>{user.username}</h3>
    </div>
  );
}
