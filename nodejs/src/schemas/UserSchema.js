const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  photos: {
    type: Array,
    required: false,
    default: [
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fmale-silhouette-profile%2Fmale-silhouette-profile-6.png&f=1&nofb=1&ipt=44915bcb0f5d0d9b97061637bf57f3dda00f45349069f874e4f8418c386f3f13&ipo=images',
    ],
  },
  likes: {
    type: Array,
    required: false,
  },
  iLiked: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model('FinalTaskUsers', UserSchema);
