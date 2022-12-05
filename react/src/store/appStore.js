import { createSlice } from '@reduxjs/toolkit';

export const appStore = createSlice({
  name: 'appStore',
  initialState: {
    authPage: false,
    username: '',
    passOne: '',
    passTwo: '',
    city: '',
    gender: '',
    age: 0,
    errorMessage: '',
  },
  reducers: {
    changeAuthPage: (state, action) => {
      state.authPage = !state.authPage;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassOne: (state, action) => {
      state.passOne = action.payload;
    },
    setPassTwo: (state, action) => {
      state.passTwo = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { changeAuthPage, setUsername, setPassOne, setPassTwo, setCity, setGender, setAge, setError } = appStore.actions;

export default appStore.reducer;
