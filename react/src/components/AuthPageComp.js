import React from 'react';
import { useSelector } from 'react-redux';
import LoginComp from './LoginComp';
import RegisterComp from './RegisterComp';

export default function AuthPageComp() {
  const { authPage } = useSelector((state) => state.appStore);

  return (
    <div className='mt-10'>
      <div className='w-5/12 h-max bg-white mx-auto rounded-3xl drop-shadow-lg'>
        {!authPage && <RegisterComp></RegisterComp>}
        {authPage && <LoginComp></LoginComp>}
      </div>
    </div>
  );
}
