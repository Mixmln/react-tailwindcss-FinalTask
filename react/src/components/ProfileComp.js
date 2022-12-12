import React from 'react';
import { useSelector } from 'react-redux';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { FaUserCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from './ProfilePhoto';
import { useContext } from 'react';
import MainContext from '../context/MainContext';
import { resetValues, setDeleteAccTrigger, setLogged, setPhotoIndex } from '../store/appStore';
import { useEffect } from 'react';
import DeleteProfileModal from './DeleteProfileModal';

export default function ProfileComp() {
  const { logged, photoIndex, errorMessage, deleteAccTrigger } = useSelector((state) => state.appStore);

  const { socket, dispatch } = useContext(MainContext);

  const nav = useNavigate();

  useEffect(() => {
    socket.on('profilePhotoUpdated', (data) => {
      dispatch(setLogged(data));
    });
  }, []);

  const slidePhotoToRight = (MaxNumberOfItems) => {
    if (logged.photos.length === 1) return;
    if (photoIndex >= MaxNumberOfItems) {
      dispatch(setPhotoIndex(0));
    } else {
      dispatch(setPhotoIndex(photoIndex + 1));
    }
  };
  const slidePhotoToLeft = (MaxNumberOfItems) => {
    if (logged.photos.length === 1) return;
    if (photoIndex <= 0) {
      dispatch(setPhotoIndex(MaxNumberOfItems));
    } else {
      dispatch(setPhotoIndex(photoIndex - 1));
    }
  };

  const logOut = () => {
    socket.emit('logout', { name: logged.username });
    if (localStorage.getItem('username')) {
      localStorage.removeItem('username');
    }
    dispatch(setLogged(null));
    dispatch(resetValues());
    nav('/');
  };

  return (
    <div className='w-5/12 mx-auto my-10 border-2 shadow-lg rounded-xl p-10 bg-slate-100 h-max relative'>
      <div className='flex flex-col gap-6'>
        {errorMessage && <h2 className='text-center text-lg text-red-400'>{errorMessage}</h2>}
        <div className='flex items-center'>
          <BsChevronCompactLeft
            className='w-3/12 h-96 text-7xl hover:bg-gray-200 hover:text-8xl active:text-orange-300 transition-all cursor-pointer'
            onClick={() => slidePhotoToLeft(logged.photos.length - 1)}
          ></BsChevronCompactLeft>
          <ProfilePhoto index={photoIndex}></ProfilePhoto>
          <BsChevronCompactRight
            className='w-3/12 h-96 text-7xl hover:bg-gray-200 hover:text-8xl active:text-orange-300 transition-all cursor-pointer'
            onClick={() => slidePhotoToRight(logged.photos.length - 1)}
          ></BsChevronCompactRight>
        </div>
        <div className='flex gap-3 w-7/12 mx-auto items-center justify-between pr-10'>
          <div className='flex items-center gap-3 '>
            <h2 className='text-xl font-semibold tracking-wider'>{logged.username}</h2>
            <h3 className='text-lg'>{logged.age}</h3>
            <FaUserCheck className='text-2xl text-gray-600'></FaUserCheck>
          </div>
        </div>
        <div className='flex gap-3 w-7/12 mx-auto items-center'>
          <h3 className='text-xl font-semibold tracking-wider'>{logged.gender}</h3>
        </div>
        <div className='flex gap-3 w-7/12 mx-auto items-center'>
          <h4 className='text-lg tracking-wider'>
            Lives in <span className='font-semibold text-orange-500'>{logged.city}</span>{' '}
          </h4>
        </div>
        <div className='flex flex-col w-1/4 items-center justify-around absolute bottom-1 right-1'>
          <button className='w-full px-2 py-3 border-2 rounded-xl bg-orange-200 hover:bg-orange-300 hover:font-semibold active:bg-orange-300 transition-all	text-sm' onClick={() => nav('/photos')}>
            Add photo
          </button>
          <button className='w-full px-2 py-3 border-2 rounded-xl bg-orange-200 hover:bg-orange-300 hover:font-semibold active:bg-orange-300 transition-all	text-sm' onClick={() => nav('/changePhoto')}>
            Change profile photo
          </button>
          <button className='w-full px-2 py-3 border-2 rounded-xl bg-orange-200 hover:bg-orange-300 hover:font-semibold active:bg-orange-300 transition-all	text-sm' onClick={logOut}>
            Logout
          </button>
          <button
            className='w-full px-2 py-3 border-2 rounded-xl bg-orange-200 hover:bg-orange-300 hover:font-semibold active:bg-orange-300 transition-all	text-sm'
            onClick={() => dispatch(setDeleteAccTrigger(true))}
          >
            Delete Acc
          </button>
        </div>
      </div>
      {deleteAccTrigger && <DeleteProfileModal></DeleteProfileModal>}
    </div>
  );
}
