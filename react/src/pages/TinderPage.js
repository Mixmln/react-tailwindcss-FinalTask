import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MainTinderComp from '../components/MainTinderComp';
import Sidebar from '../components/Sidebar';
import MainContext from '../context/MainContext';
import { setError } from '../store/appStore';

export default function TinderPage() {
  const { showFilter, logged } = useSelector((state) => state.appStore);

  const nav = useNavigate();

  const { dispatch } = useContext(MainContext);

  useEffect(() => {
    if (logged.photos.length < 2) {
      dispatch(setError('You should have at least 2 photos'));
      nav('/profile');
    }
  }, []);

  return (
    <div className='bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 w-screen h-screen'>
      <Header></Header>
      <div className='flex w-10/12 m-auto gap-10 items-start h-5/6 justify-center'>
        {showFilter && <Sidebar></Sidebar>}
        <MainTinderComp></MainTinderComp>
      </div>
    </div>
  );
}
