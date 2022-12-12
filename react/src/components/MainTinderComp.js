import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import MainContext from '../context/MainContext';
import { setError, setFilteredUsers } from '../store/appStore';
import UserCard from './UserCard';

export default function MainTinderComp() {
  const { allUsers, errorMessage } = useSelector((state) => state.appStore);

  const { socket, dispatch } = useContext(MainContext);

  useEffect(() => {
    socket.on('filteredUsers', (data) => {
      if (data.length === 0) dispatch(setError('No filtered users'));
      dispatch(setFilteredUsers(data));
    });
  }, []);

  return (
    <div className='w-full mt-5 m-auto h-5/6 rounded-xl bg-transparent flex justify-center flex-col items-center'>
      {errorMessage && <h3 className='text-2xl text-orange-500 mb-3'>{errorMessage}</h3>}
      {allUsers && <UserCard></UserCard>}
    </div>
  );
}
