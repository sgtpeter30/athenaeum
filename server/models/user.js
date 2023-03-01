const mongoose = require('mongoose');
const uniqueValid = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  login: { type: String, required: true, unique: true},
  password: { type: String, required: true},
});

userSchema.plugin(uniqueValid);

module.exports = mongoose.model('User', userSchema);
