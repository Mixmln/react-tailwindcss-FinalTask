import React from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import MainContext from '../context/MainContext';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { setMessages } from '../store/appStore';
import MessageComp from './MessageComp';

export default function ChatComp() {
  const { selectedUserToChat, logged, messages, loggedUsers } = useSelector((state) => state.appStore);

  const { socket, dispatch } = useContext(MainContext);

  const ref = useRef();

  useEffect(() => {
    socket.on('filteredMessages', (data) => {
      dispatch(setMessages(data));
    });
  }, []);

  const checkOnline = () => {
    return loggedUsers.some((user) => user.username === selectedUserToChat.username);
  };

  const sendMessage = () => {
    const date = format(new Date(), 'MMMM d H:m');
    let data;

    const loggedUser = loggedUsers.find((user) => user.username === selectedUserToChat.username);

    if (loggedUser) {
      data = {
        logged: loggedUser,
        users: [logged.username, selectedUserToChat.username],
        message: ref.current.value,
        date,
        dateToSort: new Date().getTime(),
      };
    }
    if (!loggedUser) {
      data = {
        users: [logged.username, selectedUserToChat.username],
        message: ref.current.value,
        date,
        dateToSort: new Date().getTime(),
      };
    }

    if (ref.current.value !== '') {
      socket.emit('sendMessage', data);
      ref.current.value = '';
      return;
    }
  };

  return (
    <div className='w-6/12 absolute right-60 top-5 border-4 border-orange-500/30 rounded-xl bg-white h-75 flex flex-col justify-between'>
      <div className='border-b-4 border-orange-500/30 h-28 px-16 py-2 flex items-center gap-10'>
        <div className={`rounded-full w-4 h-4 border ${checkOnline() ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <img src={selectedUserToChat.photos[0]} alt='' className='object-cover w-24 h-24 rounded-full shadow-2xl border border-orange-500 p-px' />
        <div className='flex content-start'>
          <h3 className='text-xl font-semibold text-orange-900 tracking-wider'>{selectedUserToChat.username}</h3>
        </div>
      </div>

      <div className='h-full mb-px p-2 flex flex-col gap-2 overflow-y-scroll scroll-smooth'>{messages && messages.map((mess, i) => <MessageComp mess={mess} key={i}></MessageComp>)}</div>
      <div className='border-t-2 h-32 border-orange-500/30 bg-orange-500/20 rounded-b-lg shadow-inner flex items-center justify-center'>
        <div className='relative w-11/12'>
          <input ref={ref} type='text' placeholder='Type a message' className='w-full h-12 pl-10 rounded-2xl focus:ring-orange-600 ring-orange-600 outline-none ' />
          <button
            className='absolute right-2 w-24 h-10 top-1 border-2 rounded-xl bg-orange-500/80 text-white tracking-widest hover:bg-orange-500/90 transition-all active:scale-90 active:shadow-inner active:shadow-orange-600'
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
