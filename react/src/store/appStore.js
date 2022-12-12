import { createSlice } from '@reduxjs/toolkit';

export const appStore = createSlice({
  name: 'appStore',
  initialState: {
    authPage: false,
    username: '',
    passOne: '',
    passTwo: '',
    city: 'All',
    gender: '',
    age: 0,
    stayLogged: false,
    errorMessage: '',
    logged: null,
    loggedUserPhoto: null,
    photoTrigger: false,
    deletePhotoTrigger: false,
    selectedPhoto: '',
    photoIndex: 0,
    allUsers: [],
    allUsersWithoutThoseWhoILiked: [],
    selectedUserIndex: 0,
    showFilter: false,
    filteredUsers: [],
    likesSidebar: 'matches',
    userMatches: [],
    notMatchedLikes: 0,
    chatTrigger: false,
    userPreview: false,
    selectedUserToChat: null,
    messages: [],
    loggedUsers: [],
    selectedUserToPreview: null,
    deleteAccTrigger: false,
    notificationTrigger: false,
    notificationMessage: '',
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
    setUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setSelectedUserIndex: (state, action) => {
      state.selectedUserIndex = action.payload;
    },
    setAllUsersWithoutThoseWhoILiked: (state, action) => {
      state.allUsersWithoutThoseWhoILiked = action.payload;
    },
    setLoggedUserPhoto: (state, action) => {
      state.loggedUserPhoto = action.payload;
    },
    setShowFilter: (state, action) => {
      state.showFilter = !state.showFilter;
    },
    resetValues: (state, action) => {
      state.username = '';
      state.passOne = '';
      state.passTwo = '';
      state.city = 'All';
      state.gender = '';
      state.age = 0;
      state.errorMessage = '';
      state.showFilter = false;
    },
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
    setLikesSidebar: (state, action) => {
      state.likesSidebar = action.payload;
    },
    setMatches: (state, action) => {
      state.userMatches = action.payload;
    },
    setNotMatchedLikes: (state, action) => {
      state.notMatchedLikes = action.payload;
    },
    setChatTrigger: (state, action) => {
      state.chatTrigger = action.payload;
    },
    setUserPreviewTrigger: (state, action) => {
      state.userPreview = action.payload;
    },
    setUserToChat: (state, action) => {
      state.selectedUserToChat = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setLoggedUsers: (state, action) => {
      state.loggedUsers = action.payload;
    },
    setSelectedUserToPreview: (state, action) => {
      state.selectedUserToPreview = action.payload;
    },
    setDeleteAccTrigger: (state, action) => {
      state.deleteAccTrigger = action.payload;
    },
    setNotificationTrigger: (state, action) => {
      state.notificationTrigger = action.payload;
    },
    setNotificationMessage: (state, action) => {
      state.notificationMessage = action.payload;
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
  setUsers,
  setSidebarOption,
  setSelectedUserIndex,
  setAllUsersWithoutThoseWhoILiked,
  setLoggedUserPhoto,
  setShowFilter,
  resetValues,
  setFilteredUsers,
  setLikesSidebar,
  setMatches,
  setNotMatchedLikes,
  setChatTrigger,
  setUserToChat,
  setMessages,
  setLoggedUsers,
  setUserPreviewTrigger,
  setSelectedUserToPreview,
  setDeleteAccTrigger,
  setNotificationTrigger,
  setNotificationMessage,
} = appStore.actions;

export default appStore.reducer;
