import React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { setDeleteAccTrigger, setLogged } from '../store/appStore';

export default function DeleteProfileModal() {
  const { logged, deleteAccTrigger } = useSelector((state) => state.appStore);

  const { socket, dispatch } = useContext(MainContext);

  const nav = useNavigate();

  const deleteAcc = () => {
    socket.emit('deleteAcc', { user: logged });
    dispatch(setDeleteAccTrigger(false));
    dispatch(setLogged(null));
    alert('Account deleted');
    nav('/');
  };

  const cancel = () => {
    dispatch(setDeleteAccTrigger(false));
  };

  return (
    <div className={`h-screen w-full fixed left-0 top-0 bg-black bg-opacity-50 ${deleteAccTrigger ? 'flex items-center justify-center' : 'hidden'}`}>
      <div className='bg-white rounded shadow-lg w-3/12'>
        <div className='border-b px-4 py-2'>Are you sure?</div>
        <div className='flex justify-end items-center w-100 border-t p-3'>
          <button className='bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white mr-1' onClick={cancel}>
            Cancel
          </button>
          <button className='bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded text-white mr-1' onClick={deleteAcc}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
