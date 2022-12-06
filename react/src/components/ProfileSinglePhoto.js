import React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import MainContext from '../context/MainContext';
import { setDeletePhotoTrigger, setLogged, setSelectedPhoto } from '../store/appStore';

export default function ProfileSinglePhoto({ photo, index }) {
  const { logged, deletePhotoTrigger } = useSelector((state) => state.appStore);

  const { socket, dispatch } = useContext(MainContext);

  const selectPhoto = (img) => {
    dispatch(setDeletePhotoTrigger());
    dispatch(setSelectedPhoto(img));
  };

  // const deletePhoto = () => {
  //   console.log('selectedPhoto ==> ', photo);
  //   const data = {
  //     name: logged.username,
  //     photoToDelete: photo,
  //   };
  // };

  return <img src={photo} onClick={() => selectPhoto(photo)} alt='' className=' h-72 border-2 bg-gray-300 w-1/3 shadow-lg rounded-lg object-cover cursor-pointer' />;
}
