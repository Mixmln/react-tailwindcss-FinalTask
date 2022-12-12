import React from 'react';
import { useSelector } from 'react-redux';
import ChatComp from './ChatComp';
import LikesCompSideBar from './LikesCompSideBar';
import UserPreviewComp from './UserPreviewComp';

export default function LikesComp() {
  const { chatTrigger, likesSidebar, userPreview } = useSelector((state) => state.appStore);

  return (
    <div className='max-h-screen relative'>
      <LikesCompSideBar></LikesCompSideBar>
      {chatTrigger && likesSidebar === 'messages' && <ChatComp></ChatComp>}
      {userPreview && likesSidebar === 'matches' && <UserPreviewComp></UserPreviewComp>}
    </div>
  );
}
