import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { FaRegHeart, FaUserCheck } from 'react-icons/fa';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { useSelector } from 'react-redux';
import MainContext from '../context/MainContext';
import { setAllUsersWithoutThoseWhoILiked, setSelectedUserIndex } from '../store/appStore';

export default function UserCard() {
  const { allUsers, allUsersWithoutThoseWhoILiked, selectedUserIndex, logged, filteredUsers } = useSelector((state) => state.appStore);

  useEffect(() => {
    const users = allUsers.filter((user) => {
      const likedUser = logged.iLiked.find((name) => user.username === name);
      return user.username !== likedUser;
    });
    dispatch(setAllUsersWithoutThoseWhoILiked(users));
  }, []);

  const { socket, dispatch } = useContext(MainContext);

  const nextUser = (maxNumberOfUsers) => {
    if (selectedUserIndex >= maxNumberOfUsers) {
      dispatch(setSelectedUserIndex(0));
    } else {
      dispatch(setSelectedUserIndex(selectedUserIndex + 1));
    }
  };

  const like = () => {
    const data = {
      likeFrom: logged.username,
      likeTo: filteredUsers.length !== 0 ? filteredUsers[selectedUserIndex].username : allUsersWithoutThoseWhoILiked[selectedUserIndex].username,
    };
    socket.emit('likeUser', data);
    nextUser(filteredUsers.length !== 0 ? filteredUsers.length - 1 : allUsersWithoutThoseWhoILiked.length - 1);
  };

  return (
    <div className='w-3/12 h-full py-3 shadow-2xl overflow-y-scroll overflow-x-hidden bg-gray-200 rounded-lg flex flex-col items-center relative'>
      {filteredUsers.length === 0 ? (
        allUsersWithoutThoseWhoILiked.length > 0 && (
          <div className=' flex flex-col gap-2 pb-4'>
            {allUsersWithoutThoseWhoILiked[selectedUserIndex].photos.map((photo, i) => (
              <img key={i} className='w-80 rounded h-96 object-cover shadow-lg' src={photo} alt='' />
            ))}
          </div>
        )
      ) : (
        <div className=' flex flex-col gap-2 pb-4'>
          {filteredUsers.length > 0 && filteredUsers[selectedUserIndex].photos.map((photo, i) => <img key={i} className='w-80 rounded h-96 object-cover shadow-lg' src={photo} alt='' />)}
        </div>
      )}
      {filteredUsers.length === 0 ? (
        allUsersWithoutThoseWhoILiked.length > 0 && (
          <div className='sticky w-96 bottom-1 bg-slate-600/[.5] rounded-xl text-white hover:bg-slate-500 shadow-lg transition-all'>
            <div className='flex gap-3 w-9/12 mx-auto items-center'>
              <h2 className='text-xl font-semibold tracking-wider'>{allUsersWithoutThoseWhoILiked[selectedUserIndex].username}</h2>
              <h3 className='text-lg'>{allUsersWithoutThoseWhoILiked[selectedUserIndex].age}</h3>
              <FaUserCheck className='text-2xl text-gray-600'></FaUserCheck>
            </div>
            <div className='flex gap-3 w-9/12 mx-auto items-center'>
              <h3 className='text-xl font-semibold tracking-wider'>{allUsersWithoutThoseWhoILiked[selectedUserIndex].gender}</h3>
            </div>
            <div className='flex gap-3 w-9/12 mx-auto items-center'>
              <h4 className='text-lg tracking-wider'>
                Lives in <span className='font-semibold text-orange-500'>{allUsersWithoutThoseWhoILiked[selectedUserIndex].city}</span>{' '}
              </h4>
            </div>
            <div className='flex items-center justify-around py-2 mt-2 box-border w-full'>
              <button onClick={() => nextUser(allUsersWithoutThoseWhoILiked.length - 1)} className='box-border rounded-xl text-5xl text-red-600 hover:scale-90 transition-all active:scale-75'>
                <MdOutlineCancelPresentation></MdOutlineCancelPresentation>
              </button>
              <button onClick={like} className='rounded-xl text-4xl text-green-600 hover:scale-90 transition-all active:scale-75'>
                <FaRegHeart></FaRegHeart>
              </button>
            </div>
          </div>
        )
      ) : (
        <div className='sticky w-96 bottom-2 bg-slate-600/[.5] rounded-xl text-white hover:bg-slate-500  shadow-lg transition-all'>
          <div className='flex gap-3 w-9/12 mx-auto items-center'>
            <h2 className='text-xl font-semibold tracking-wider'>{filteredUsers[selectedUserIndex].username}</h2>
            <h3 className='text-lg'>{filteredUsers[selectedUserIndex].age}</h3>
            <FaUserCheck className='text-2xl text-gray-600'></FaUserCheck>
          </div>
          <div className='flex gap-3 w-9/12 mx-auto items-center'>
            <h3 className='text-xl font-semibold tracking-wider'>{filteredUsers[selectedUserIndex].gender}</h3>
          </div>
          <div className='flex gap-3 w-9/12 mx-auto items-center'>
            <h4 className='text-lg tracking-wider'>
              Lives in <span className='font-semibold text-orange-500'>{filteredUsers[selectedUserIndex].city}</span>{' '}
            </h4>
          </div>
          <div className='flex items-center justify-around py-2 mt-2 box-border w-full'>
            <button onClick={() => nextUser(filteredUsers.length - 1)} className='box-border rounded-xl text-5xl text-red-600 hover:scale-90 transition-all active:scale-75'>
              <MdOutlineCancelPresentation></MdOutlineCancelPresentation>
            </button>
            <button onClick={like} className='rounded-xl text-4xl text-green-600 hover:scale-90 transition-all active:scale-75'>
              <FaRegHeart></FaRegHeart>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
