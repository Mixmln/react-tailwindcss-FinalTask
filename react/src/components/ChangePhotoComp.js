import React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';

export default function ChangePhotoComp() {
  const { logged } = useSelector((state) => state.appStore);

  const { socket } = useContext(MainContext);

  const nav = useNavigate();

  const changePhoto = (img) => {
    const data = {
      name: logged.username,
      newPhoto: img,
    };
    socket.emit('changeProfilePhoto', data);
    nav('/profile');
  };

  return (
    <div className='w-7/12 mx-auto mt-2 h-4/6 bg-orange-200/50 rounded-2xl p-8 flex flex-wrap content-start gap-y-4 gap-x-11'>
      {logged &&
        logged.photos.map((photo, i) => (
          <img
            className='w-56 h-56 object-cover rounded-lg shadow p-px cursor-pointer bg-orange-100/10 hover:scale-95 active:bg-orange-500'
            src={photo}
            key={i}
            alt=''
            onClick={() => changePhoto(photo)}
          />
        ))}
    </div>
  );
}
