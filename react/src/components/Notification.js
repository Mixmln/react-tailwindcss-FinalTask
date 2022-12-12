import React from 'react';
import { useSelector } from 'react-redux';
import { MdNotificationsActive } from 'react-icons/md';

export default function Notification() {
  const { notificationMessage } = useSelector((state) => state.appStore);

  return (
    <div className='bg-orange-100 px-3 py-1 rounded-xl flex items-center gap-2'>
      <MdNotificationsActive></MdNotificationsActive>
      <p>{notificationMessage}</p>
    </div>
  );
}
