const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  // },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Email is not valid"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: "Password is not strong enough"
    }
  },
  age: {
    type: Number,
    min: 0
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  photoUrl: {
    type: String
  },
  about: {
    type: String,
    trim: true
  },
  role:{

   type: String,
    enum: ['customer', 'seller']

  }
});

userSchema.methods.getJWT = function() {
  const token = jwt.sign({ _id: this._id }, "tom@1234", { expiresIn: '1d' });
  return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
