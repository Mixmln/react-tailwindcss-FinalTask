import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import Header from '../components/Header';
import PhotoAdderComp from '../components/PhotoAdderComp';
import MainContext from '../context/MainContext';
import { setLogged } from '../store/appStore';

export default function PhotoAdderPage() {
  const { socket, dispatch } = useContext(MainContext);

  useEffect(() => {
    socket.on('photosUpdated', (data) => {
      console.log('updated User ==> ', data);
      dispatch(setLogged(data));
    });
  }, []);

  return (
    <div className='bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 w-screen h-screen'>
      <Header></Header>
      <PhotoAdderComp></PhotoAdderComp>
    </div>
  );
}
