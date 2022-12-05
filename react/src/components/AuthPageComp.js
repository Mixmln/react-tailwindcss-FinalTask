import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import MainContext from '../context/MainContext';
import { changeAuthPage } from '../store/appStore';
import LoginComp from './LoginComp';
import RegisterComp from './RegisterComp';

export default function AuthPageComp() {
  const { authPage } = useSelector((state) => state.appStore);

  const { dispatch } = useContext(MainContext);

  return (
    <div className='w-screen h-screen bg-indigo-100 pt-8'>
      <div className='w-6/12 h-max bg-white mx-auto rounded'>
        {!authPage && <RegisterComp></RegisterComp>}
        {authPage && <LoginComp></LoginComp>}
      </div>
    </div>
  );
}
