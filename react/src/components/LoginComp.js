import React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { postReq } from '../helpers/http';
import { changeAuthPage, resetValues, setError, setLogged, setPassOne, setStayLogged, setUsername } from '../store/appStore';

export default function LoginComp() {
  const { dispatch, socket } = useContext(MainContext);

  const { username, passOne, stayLogged, errorMessage } = useSelector((state) => state.appStore);

  const nav = useNavigate();

  const handleForm = async () => {
    const user = {
      username,
      password: passOne,
    };

    if (stayLogged) {
      localStorage.setItem('username', user.username);
    }
    const res = await postReq(user, 'login');

    if (res.error) {
      dispatch(setError(res.message));
    }
    if (!res.error) {
      dispatch(resetValues());
      dispatch(setLogged(res.data));
      socket.emit('logged', res.data);
      socket.emit('allUsers', { name: user.username });
      alert(res.message);
      nav('/profile');
    }
  };

  return (
    <div className='py-10 px-36 drop-shadow-lg'>
      <h2 className='font-semibold text-4xl text-gray-600 tracking-wider mb-4'>Login</h2>
      <form className='flex flex-col px-12  bg-slate-100 rounded-lg border box-border gap-10 py-12 drop-shadow-lg' onSubmit={handleForm}>
        {errorMessage && <h3 className='font-lg text-red-600'>{errorMessage}</h3>}
        <div className='flex items-center justify-between'>
          <label className='text-xl font-semibold text-neutral-900'>Username: </label>
          <input
            className=' w-5/12 px-4 py-2 bg-slate-400 rounded-lg text-white placeholder:text-white caret-orange-400'
            type='text'
            value={username}
            placeholder='Enter username...'
            onChange={(e) => dispatch(setUsername(e.target.value))}
          />
        </div>
        <div className='flex items-center justify-between'>
          <label className='text-xl font-semibold text-neutral-900'>Password: </label>
          <input
            className='w-5/12 px-4 py-2 bg-slate-400 rounded-lg text-white placeholder:text-white caret-orange-400'
            type='password'
            value={passOne}
            placeholder='Enter Password...'
            onChange={(e) => dispatch(setPassOne(e.target.value))}
          />
        </div>
        <div className='flex items-center justify-between'>
          <h5 className='text-xl font-semibold text-neutral-900'>Stay logged in</h5>
          <input type='checkbox' onChange={() => dispatch(setStayLogged())} />
        </div>
      </form>

      <div className='flex justify-around mt-4'>
        <button className='transition-all px-20 py-3 rounded-2xl bg-stone-400 text-white font-semibold hover:bg-stone-500 active:bg-stone-600' onClick={handleForm}>
          Sign In
        </button>
        <button className='px-20 py-3 rounded-2xl bg-orange-200 text-white font-semibold hover:bg-orange-300 active:bg-orange-400 transition-all' onClick={() => dispatch(changeAuthPage())}>
          Register
        </button>
      </div>
    </div>
  );
}
