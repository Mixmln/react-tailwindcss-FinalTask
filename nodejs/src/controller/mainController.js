const uid = require('uid-safe');
const bcrypt = require('bcrypt');
const UserSchema = require('../schemas/UserSchema');

module.exports = {
  register: async (req, res) => {
    const { username, passOne, city, age, gender } = req.body;
    const id = await uid(10);
    const hashedPass = await bcrypt.hash(passOne, 2);
    const user = new UserSchema({
      id,
      username,
      password: hashedPass,
      city,
      gender,
      age,
    });
    await user.save();
    res.send({ error: false, message: 'User register successfuly, Now you can sign in', data: user });
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await UserSchema.findOne({ username });
    if (user) {
      const correctPass = await bcrypt.compare(password, user.password);
      if (correctPass) {
        req.session.username = username;
        return res.send({ error: false, message: 'Success', data: user });
      }
      return res.send({ error: true, message: 'Bad Credentials', data: null });
    }
    return res.send({ error: true, message: 'User not found, register first', data: null });
  },
};
