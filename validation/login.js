const Validator = require("validator");
const isEmpty = require("./empty");

const validateLogin = loginInput => {
  let errors = {};

  loginInput.email = !isEmpty(loginInput.email) ? loginInput.email : "";
  loginInput.password = !isEmpty(loginInput.password) ? loginInput.password : "";

  if (Validator.isEmpty(loginInput.email)) {
    errors.email = "email field cannot be empty";
  } else {
    if (!Validator.isEmail(loginInput.email)) {
      errors.email = "please enter a valid email";
    }
  }
  if (Validator.isEmpty(loginInput.password)) {
    errors.password = "please enter a password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLogin;
