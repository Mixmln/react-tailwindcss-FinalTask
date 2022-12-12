import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import LikesComp from '../components/LikesComp';
import MainContext from '../context/MainContext';
import { setMatches } from '../store/appStore';

export default function LikesPage() {
  const { allUsers, logged } = useSelector((state) => state.appStore);

  const { dispatch } = useContext(MainContext);

  useEffect(() => {
    const chechMatches = (userObj) => {
      const peoplesILiked = userObj.iLiked;
      const peoplesWhoLikesMe = userObj.likes;
      const matchedNames = peoplesILiked.filter((user) => {
        const likedUser = peoplesWhoLikesMe.find((name) => user === name);
        return user === likedUser;
      });
      const matches = allUsers.filter((user) => matchedNames.find((name) => user.username === name));

      dispatch(setMatches(matches));
    };
    chechMatches(logged);
  }, []);

  return (
    <div className='bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 w-screen h-screen'>
      <Header></Header>
      <LikesComp></LikesComp>
    </div>
  );
}
