import React from 'react';
import { useSelector } from 'react-redux';

export default function ProfilePhoto({ index }) {
  const { logged } = useSelector((state) => state.appStore);

  return <img src={logged.photos[index]} alt='' className='w-1/2 h-72 m-auto object-cover' />;
}
