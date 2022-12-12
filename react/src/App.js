import '../src/css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import MainContext from '../src/context/MainContext';
import AuthPage from '../src/pages/AuthPage';
import { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import PhotoAdderPage from './pages/PhotoAdderPage';
import TinderPage from './pages/TinderPage';
import { setAllUsersWithoutThoseWhoILiked, setError, setFilteredUsers, setLogged, setLoggedUsers, setMessages, setNotificationMessage, setNotificationTrigger, setUsers } from './store/appStore';
import ChangePhotoPage from './pages/ChangePhotoPage';
import LikesPage from './pages/LikesPage';

const socket = io.connect('http://localhost:5000');

function App() {
  const dispatch = useDispatch();

  const { logged, errorMessage, notificationTrigger } = useSelector((state) => state.appStore);

  const states = {
    dispatch,
    socket,
  };

  useEffect(() => {
    if (errorMessage !== '') {
      setTimeout(() => dispatch(setError('')), 2000);
    }
  }, [errorMessage]);

  useEffect(() => {
    socket.on('privMessage', (data) => {
      dispatch(setMessages(data));
    });
  }, []);

  useEffect(() => {
    socket.on('loggedUsers', (data) => {
      dispatch(setLoggedUsers(data));
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem('username')) {
      socket.emit('user', localStorage.getItem('username'));
      return;
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    socket.on('userReceived', (data) => {
      dispatch(setLogged(data));
    });
  }, []);

  useEffect(() => {
    if (logged) {
      socket.on('allUsersReceived', (data) => {
        dispatch(setUsers(data));
      });
    }
  }, [logged]);

  useEffect(() => {
    socket.on('likeAdded', (data) => {
      dispatch(setLogged(data));
    });
  }, []);

  useEffect(() => {
    socket.on('usersWithoutLiked', (data) => {
      dispatch(setAllUsersWithoutThoseWhoILiked(data));
      dispatch(setFilteredUsers([]));
    });
  }, []);

  useEffect(() => {
    socket.on('messages', (data) => {
      dispatch(setMessages(data));
    });
  }, []);

  useEffect(() => {
    socket.on('updatedOnlineUsers', (data) => {
      dispatch(setLoggedUsers(data));
    });
  }, []);

  useEffect(() => {
    socket.on('notificationAboutLike', (data) => {
      const { message } = data;
      dispatch(setNotificationTrigger(true));
      dispatch(setNotificationMessage(message));
    });
  }, []);

  useEffect(() => {
    const reset = () => {
      dispatch(setNotificationTrigger(false));
      dispatch(setNotificationMessage(''));
    };
    if (notificationTrigger) {
      setTimeout(reset, 5000);
    }
  }, [notificationTrigger]);

  return (
    <div className='App bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 w-screen max-h-screen relative'>
      <MainContext.Provider value={states}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AuthPage />}></Route>
            <Route path='/profile' element={logged ? <ProfilePage /> : <AuthPage />}></Route>
            <Route path='/photos' element={logged ? <PhotoAdderPage /> : <AuthPage />}></Route>
            <Route path='/changePhoto' element={logged ? <ChangePhotoPage /> : <AuthPage />}></Route>
            <Route path='/tinder' element={logged ? <TinderPage /> : <AuthPage />}></Route>
            <Route path='/likes' element={logged ? <LikesPage /> : <AuthPage />}></Route>
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
