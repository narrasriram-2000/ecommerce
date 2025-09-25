const validator = require('validator');

function validation(req) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Credentials are invalid"); // throw Error object, not console.error
  } 

  if (!validator.isEmail(email)) {
    throw new Error("Email is invalid"); // throw Error object with message
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is invalid");
  }
}

module.exports = validation;
