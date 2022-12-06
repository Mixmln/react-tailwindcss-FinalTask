import React from 'react';
import AuthPageComp from '../components/AuthPageComp';
import Header from '../components/Header';

export default function AuthPage() {
  return (
    <div className='bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 w-screen h-screen'>
      <Header></Header>
      <AuthPageComp></AuthPageComp>
    </div>
  );
}
