import React from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { setPhotoTrigger } from '../store/appStore';
import PhotoDeleteModal from './PhotoDeleteModal';
import ProfileSinglePhoto from './ProfileSinglePhoto';

export default function PhotoAdderComp() {
  const { logged, photoTrigger, deletePhotoTrigger } = useSelector((state) => state.appStore);

  const { socket, dispatch } = useContext(MainContext);

  const nav = useNavigate();

  const ref = useRef();

  console.log('deletePhotoTrigger ===', deletePhotoTrigger);

  const addPhoto = () => {
    if (!photoTrigger) {
      dispatch(setPhotoTrigger());
    }
    if (photoTrigger) {
      const data = {
        name: logged.username,
        image: ref.current.value,
      };
      if (data.image !== '') {
        socket.emit('addPhoto', data);
        dispatch(setPhotoTrigger());
        nav('/profile');
      } else {
        return;
      }
    }
  };

  return (
    <div className='w-6/12 mx-auto my-10 border-2 rounded-xl p-10 bg-slate-100 h-max flex flex-wrap shadow-lg '>
      {logged && logged.photos.map((photo, i) => <ProfileSinglePhoto photo={photo} index={i} key={i}></ProfileSinglePhoto>)}
      {deletePhotoTrigger && <PhotoDeleteModal></PhotoDeleteModal>}
      <div
        onClick={addPhoto}
        className='border-2 bg-gray-300 w-1/3 shadow-lg rounded-lg h-72 flex items-center justify-center text-8xl font-thin hover:bg-gray-200 cursor-pointer active:bg-gray-400 transition-all flex-col'
      >
        {photoTrigger && <input ref={ref} type='url' placeholder='Image url...' className='w-10/12 h-8 text-lg pl-3 rounded-lg' />}
        <button>+</button>
      </div>
    </div>
  );
}
