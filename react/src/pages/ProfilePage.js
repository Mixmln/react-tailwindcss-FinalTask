import React, { useEffect } from 'react';
import { useContext } from 'react';
import Header from '../components/Header';
import ProfileComp from '../components/ProfileComp';
import MainContext from '../context/MainContext';
import { setLogged } from '../store/appStore';

export default function ProfilePage() {
  const { socket, dispatch } = useContext(MainContext);

  useEffect(() => {
    socket.on('photoAdded', (data) => {
      dispatch(setLogged(data));
    });
  }, []);

  return (
    <div className='bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 w-screen h-screen'>
      <Header></Header>
      <ProfileComp></ProfileComp>
    </div>
  );
}
