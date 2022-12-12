import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserCheck } from 'react-icons/fa';

export default function UserPreviewComp() {
  const { selectedUserToPreview } = useSelector((state) => state.appStore);

  return (
    <div>
      <div className='w-3/12 h-75 mx-auto py-3 shadow-2xl overflow-y-scroll overflow-x-hidden bg-gray-200 rounded-lg flex flex-col items-center relative'>
        <div className=' flex flex-col gap-2 pb-4 '>
          {selectedUserToPreview.photos.map((photo, i) => (
            <img key={i} className='w-80 rounded h-96 object-cover shadow-lg' src={photo} alt='' />
          ))}
        </div>
        <div className='sticky w-96 bottom-1 bg-slate-600/[.5] rounded-xl text-white hover:bg-slate-500 shadow-lg transition-all'>
          <div className='flex gap-3 w-9/12 mx-auto items-center'>
            <h2 className='text-xl font-semibold tracking-wider'>{selectedUserToPreview.username}</h2>
            <h3 className='text-lg'>{selectedUserToPreview.age}</h3>
            <FaUserCheck className='text-2xl text-gray-600'></FaUserCheck>
          </div>
          <div className='flex gap-3 w-9/12 mx-auto items-center'>
            <h3 className='text-xl font-semibold tracking-wider'>{selectedUserToPreview.gender}</h3>
          </div>
          <div className='flex gap-3 w-9/12 mx-auto items-center'>
            <h4 className='text-lg tracking-wider'>
              Lives in <span className='font-semibold text-orange-500'>{selectedUserToPreview.city}</span>{' '}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
