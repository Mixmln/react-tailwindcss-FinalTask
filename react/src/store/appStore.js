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
    stayLogged: false,
    errorMessage: '',
    logged: null,
    photoTrigger: false,
    deletePhotoTrigger: false,
    selectedPhoto: '',
    photoIndex: 0,
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
    setLogged: (state, action) => {
      state.logged = action.payload;
    },
    setStayLogged: (state, action) => {
      state.stayLogged = !state.stayLogged;
    },
    setPhotoTrigger: (state, action) => {
      state.photoTrigger = !state.photoTrigger;
    },
    setDeletePhotoTrigger: (state, action) => {
      state.deletePhotoTrigger = !state.deletePhotoTrigger;
    },
    setSelectedPhoto: (state, action) => {
      state.selectedPhoto = action.payload;
    },
    setPhotoIndex: (state, action) => {
      state.photoIndex = action.payload;
    },
  },
});

export const {
  changeAuthPage,
  setUsername,
  setPassOne,
  setPassTwo,
  setCity,
  setGender,
  setAge,
  setError,
  setStayLogged,
  setLogged,
  setPhotoTrigger,
  setDeletePhotoTrigger,
  setSelectedPhoto,
  setPhotoIndex,
} = appStore.actions;

export default appStore.reducer;
