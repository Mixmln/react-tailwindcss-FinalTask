import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import MainContext from '../context/MainContext';
import { setChatTrigger, setLikesSidebar, setNotMatchedLikes } from '../store/appStore';
import MatchedUser from './MatchedUser';
import RoomComp from './RoomComp';

export default function LikesCompSideBar() {
  const { likesSidebar, logged, userMatches, notMatchedLikes } = useSelector((state) => state.appStore);

  const { dispatch } = useContext(MainContext);

  useEffect(() => {
    const calculateLikes = () => {
      const likes = logged.likes;
      const notMatchedUsers = likes.filter((username) => {
        const matchedUser = userMatches.find((user) => user.username === username);
        if (matchedUser === undefined) {
          return true;
        }
      });
      dispatch(setNotMatchedLikes(notMatchedUsers));
    };
    calculateLikes();
  }, [userMatches]);

  const seeMatches = () => {
    dispatch(setLikesSidebar('matches'));
    dispatch(setChatTrigger(false));
  };
  const seeMessages = () => {
    dispatch(setLikesSidebar('messages'));
  };

  return (
    <div className='absolute left-0 h-100 w-1/4 border top-0 overflow-hidden bg-white/80'>
      <div className='h-14 border-b-2 border-orange-700/20 flex items-center gap-7 pl-10'>
        <h4 className={`font-semibold text-lg hover:scale-95 cursor-pointer transition-all ${likesSidebar === 'matches' ? 'border-b-4 border-orange-600 rounded' : ''}`} onClick={seeMatches}>
          Matches
        </h4>
        <h4 className={`font-semibold text-lg hover:scale-95 cursor-pointer transition-all ${likesSidebar === 'messages' ? 'border-b-4 border-orange-600 rounded' : ''}`} onClick={seeMessages}>
          Messages
        </h4>
      </div>
      {likesSidebar === 'matches' && (
        <div className='h-128 max-h-128 m-2 p-2 flex flex-wrap content-start  gap-y-8 gap-x-6 overflow-y-scroll overflow-x-hidden'>
          <div className='relative border-4 border-yellow-400 rounded-xl p-1  hover:scale-95 transition-all'>
            <div className='bg-[url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.MwDMlrUFkyYDtxqzdxLltAHaLH%26pid%3DApi&f=1&ipt=1bf88eec36439c8c2be88c52e249f824c7a0f64a0f01f3f37eb8726e54916198&ipo=images)] blur bg-cover rounded w-28 h-32'></div>
            <div className='absolute w-9 h-9 rounded-full border-2 border-yellow-400/60 bg-yellow-400/80 blur-none bottom-12 left-11 flex items-center justify-center font-semibold text-white'>
              {notMatchedLikes.length}
            </div>
            <p className='absolute bottom-1 left-2 font-semibold text-white'>{notMatchedLikes.length} Likes</p>
          </div>
          {userMatches && userMatches.map((user, i) => <MatchedUser user={user} key={i}></MatchedUser>)}
        </div>
      )}
      {likesSidebar === 'messages' && (
        <div className='h-128 max-h-128 m-2 p-2 flex flex-wrap content-start gap-3 overflow-y-scroll'>{userMatches && userMatches.map((user, i) => <RoomComp user={user} key={i}></RoomComp>)}</div>
      )}
    </div>
  );
}
