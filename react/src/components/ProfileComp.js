import React from 'react';
import { useSelector } from 'react-redux';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { FaUserCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from './ProfilePhoto';
import { useContext } from 'react';
import MainContext from '../context/MainContext';
import { setPhotoIndex } from '../store/appStore';

export default function ProfileComp() {
  const { logged, photoIndex } = useSelector((state) => state.appStore);

  const { socket, dispatch } = useContext(MainContext);

  const nav = useNavigate();

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

  return (
    <div className='w-5/12 mx-auto my-10 border-2 shadow-lg rounded-xl p-10 bg-slate-100 h-max'>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center'>
          <BsChevronCompactLeft
            className='w-3/12 h-80 text-7xl hover:bg-gray-200 hover:text-8xl active:text-orange-300 transition-all cursor-pointer'
            onClick={() => slidePhotoToLeft(logged.photos.length - 1)}
          ></BsChevronCompactLeft>
          <ProfilePhoto index={photoIndex}></ProfilePhoto>
          <BsChevronCompactRight
            className='w-3/12 h-80 text-7xl hover:bg-gray-200 hover:text-8xl active:text-orange-300 transition-all cursor-pointer'
            onClick={() => slidePhotoToRight(logged.photos.length - 1)}
          ></BsChevronCompactRight>
        </div>
        <div className='flex gap-3 w-7/12 mx-auto items-center'>
          <h2 className='text-xl font-semibold tracking-wider'>{logged.username}</h2>
          <h3 className='text-lg'>{logged.age}</h3>
          <FaUserCheck className='text-2xl text-gray-600'></FaUserCheck>
        </div>
        <div className='flex gap-3 w-7/12 mx-auto items-center'>
          <h4 className='text-lg tracking-wider'>
            Lives in <span className='font-semibold text-orange-500'>{logged.city}</span>{' '}
          </h4>
        </div>
        <div className='flex items-center justify-around'>
          <button className='w-3/12 py-4 border-2 rounded-3xl bg-orange-300 hover:bg-orange-400 hover:font-semibold active:bg-orange-500 transition-all	' onClick={() => nav('/photos')}>
            Add photo
          </button>
          <button className='w-3/12 py-4 border-2 rounded-3xl bg-orange-300 hover:bg-orange-400 hover:font-semibold active:bg-orange-500 transition-all'>Change profile photo</button>
          <button className='w-3/12 py-4 border-2 rounded-3xl bg-orange-300 hover:bg-orange-400 hover:font-semibold active:bg-orange-500 transition-all'>Logout</button>
        </div>
      </div>
    </div>
  );
}
