/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
const MessageSchema = require('../schemas/MessageSchema');
const UserSchema = require('../schemas/UserSchema');

const loggedInUsers = [];
module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('user', async (name) => {
      const found = await UserSchema.findOne({ username: name });
      if (found) {
        socket.emit('userReceived', found);
      }
    });
    socket.on('logged', (data) => {
      const loggedUser = { ...data, socketId: socket.id };
      loggedInUsers.push(loggedUser);
      io.emit('loggedUsers', loggedInUsers);
    });
    socket.on('logout', (data) => {
      const { name } = data;
      const foundIndex = loggedInUsers.findIndex((user) => user.username === name);
      loggedInUsers.splice(foundIndex);
      io.emit('loggedUsers', loggedInUsers);
    });
    socket.on('disconnect', () => {
      const foundIndex = loggedInUsers.findIndex((user) => user.socketId === socket.id);
      loggedInUsers.splice(foundIndex, 1);
      const onlyUsers = loggedInUsers.map((x) => x.user);
      console.log('onlyUsers ===', onlyUsers);
      socket.broadcast.emit('updatedOnlineUsers', onlyUsers);
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
    socket.on('allUsers', async (data) => {
      const { name } = data;
      const users = await UserSchema.find();
      const withoutMe = users.filter((user) => user.username !== name);
      socket.emit('allUsersReceived', withoutMe);
    });
    socket.on('likeUser', async (data) => {
      const { likeFrom, likeTo } = data;
      await UserSchema.findOneAndUpdate(
        { username: likeFrom },
        {
          $push: {
            iLiked: likeTo,
          },
        }
      );
      await UserSchema.findOneAndUpdate(
        { username: likeTo },
        {
          $push: {
            likes: likeFrom,
          },
        }
      );

      const users = await UserSchema.find();
      const logged = await UserSchema.findOne({ username: likeFrom });

      const updatedUsers = users
        .filter((user) => {
          const likedUser = logged.iLiked.find((name) => user.username === name);
          return user.username !== likedUser;
        })
        .filter((user) => user.username !== likeFrom);
      const isUserOnline = loggedInUsers.find((user) => user.username === likeTo);
      if (isUserOnline) {
        io.to(isUserOnline.socketId).emit('notificationAboutLike', { message: 'You got a like from user' });
      }

      const updatedUserWhoClickedLike = await UserSchema.findOne({ username: likeFrom });
      socket.emit('likeAdded', updatedUserWhoClickedLike);
      socket.emit('usersWithoutLiked', updatedUsers);
    });
    socket.on('changeProfilePhoto', async (data) => {
      const { name, newPhoto } = data;
      const user = await UserSchema.findOne({ username: name });
      const newArray = user.photos.filter((photo) => photo !== newPhoto);
      newArray.unshift(newPhoto);
      await UserSchema.findOneAndUpdate(
        { username: name },
        {
          $set: {
            photos: newArray,
          },
        }
      );
      const updatedUser = await UserSchema.findOne({ username: name });
      socket.emit('profilePhotoUpdated', updatedUser);
    });
    socket.on('saveFilter', async (data) => {
      const { city, gender } = data;
      const users = await UserSchema.find();
      const logged = await UserSchema.findOne({ username: data.name });
      let usersToBeSend = [];
      if (city !== 'All' && gender !== 'Other') {
        usersToBeSend = users
          .filter((user) => user.city === data.city)
          .filter((user) => user.gender === data.gender)
          .filter((user) => user.age <= data.age)
          .filter((user) => {
            const likedUser = logged.iLiked.find((userName) => user.username === userName);
            return user.username !== likedUser;
          })
          .filter((user) => user.username !== logged.username);
      }
      if (city === 'All') {
        usersToBeSend = users
          .filter((user) => user.gender === data.gender)
          .filter((user) => user.age <= data.age)
          .filter((user) => {
            const likedUser = logged.iLiked.find((userName) => user.username === userName);
            return user.username !== likedUser;
          })
          .filter((user) => user.username !== logged.username);
      }
      if (gender === 'Other') {
        usersToBeSend = users
          .filter((user) => user.city === data.city)
          .filter((user) => user.age <= data.age)
          .filter((user) => {
            const likedUser = logged.iLiked.find((userName) => user.username === userName);
            return user.username !== likedUser;
          })
          .filter((user) => user.username !== logged.username);
      }
      if (gender === 'Other' && city === 'All') {
        usersToBeSend = users
          .filter((user) => user.age <= data.age)
          .filter((user) => {
            const likedUser = logged.iLiked.find((userName) => user.username === userName);
            return user.username !== likedUser;
          })
          .filter((user) => user.username !== logged.username);
      }
      socket.emit('filteredUsers', usersToBeSend);
    });
    socket.on('sendMessage', async (data) => {
      const { users, logged, date, message, dateToSort } = data;
      const msg = new MessageSchema({
        users,
        message,
        date,
        dateToSort,
      });
      await msg.save();
      const firstUser = users[0];
      const secondUser = users[1];
      const messages = await MessageSchema.find();
      const filteredMessages = messages.filter((mess) => (mess.users[0] === firstUser && mess.users[1] === secondUser) || (mess.users[0] === secondUser && mess.users[1] === firstUser));
      if (logged) {
        io.to(logged.socketId).emit('privMessage', filteredMessages);
      }
      socket.emit('messages', filteredMessages);
    });
    socket.on('getMessages', async (data) => {
      const { users } = data;
      const firstUser = users[0];
      const secondUser = users[1];
      const messages = await MessageSchema.find();
      const filteredMessages = messages.filter((mess) => (mess.users[0] === firstUser && mess.users[1] === secondUser) || (mess.users[0] === secondUser && mess.users[1] === firstUser));
      socket.emit('filteredMessages', filteredMessages);
    });
    socket.on('deleteAcc', async (data) => {
      const { user } = data;
      await UserSchema.findOneAndRemove({ username: user.username });
    });
  });
};
