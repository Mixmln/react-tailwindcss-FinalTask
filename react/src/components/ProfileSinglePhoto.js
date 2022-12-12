import React from 'react';
import { useContext } from 'react';
import MainContext from '../context/MainContext';
import { setDeletePhotoTrigger, setSelectedPhoto } from '../store/appStore';

export default function ProfileSinglePhoto({ photo, index }) {
  const { dispatch } = useContext(MainContext);

  const selectPhoto = (img) => {
    dispatch(setDeletePhotoTrigger());
    dispatch(setSelectedPhoto(img));
  };

  return <img src={photo} onClick={() => selectPhoto(photo)} alt='' className=' h-72 border-2 bg-gray-300 w-1/3 shadow-lg rounded-lg object-cover cursor-pointer' />;
}
