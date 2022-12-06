import '../src/css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import MainContext from '../src/context/MainContext';
import AuthPage from '../src/pages/AuthPage';
import { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import PhotoAdderPage from './pages/PhotoAdderPage';

const socket = io.connect('http://localhost:5000');

function App() {
  const dispatch = useDispatch();

  const { logged, stayLogged } = useSelector((state) => state.appStore);

  const states = {
    dispatch,
    socket,
  };

  useEffect(() => {
    console.log('stayLogged ===', stayLogged);
    if (stayLogged) {
      if (localStorage.getItem('username') === logged.username) {
        socket.emit('user', localStorage.getItem('username'));
        return;
      } else {
        return;
      }
    }
  }, []);

  useEffect(() => {
    socket.on('userReceived', (data) => {
      console.log('User ==> ', data);
    });
  }, []);

  return (
    <div className='App'>
      <MainContext.Provider value={states}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AuthPage />}></Route>
            <Route path='/profile' element={logged ? <ProfilePage /> : <AuthPage />}></Route>
            <Route path='/photos' element={logged ? <PhotoAdderPage /> : <AuthPage />}></Route>
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
