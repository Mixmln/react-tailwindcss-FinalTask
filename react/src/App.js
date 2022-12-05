import '../src/css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import MainContext from '../src/context/MainContext';
import AuthPage from '../src/pages/AuthPage';

// const socket = io.connect('http://localhost:5000');

function App() {
  const dispatch = useDispatch();

  const states = {
    dispatch,
    // socket,
  };

  return (
    <div className='App'>
      <MainContext.Provider value={states}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AuthPage />}></Route>
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
