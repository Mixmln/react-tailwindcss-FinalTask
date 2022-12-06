const UserSchema = require('../schemas/UserSchema');

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('user', async (name) => {
      const found = await UserSchema.findOne({ username: name });
      if (found) {
        socket.emit('userReceived', found);
      }
    });
    socket.on('addPhoto', async (data) => {
      const { name, image } = data;
      await UserSchema.findOneAndUpdate(
        { username: name },
        {
          $push: {
            photos: image,
          },
        }
      );
      const updatedUser = await UserSchema.findOne({ username: name });
      socket.emit('photoAdded', updatedUser);
    });
    socket.on('deletePhoto', async (data) => {
      const { name, photoToDelete } = data;
      await UserSchema.findOneAndUpdate(
        { username: name },
        {
          $pull: {
            photos: photoToDelete,
          },
        }
      );
      const updatedUser = await UserSchema.findOne({ username: name });
      socket.emit('photosUpdated', updatedUser);
    });
  });
};
