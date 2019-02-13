const Validator = require('validator');
const isEmpty = require('./empty');

const validateRegisterInput = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    } else {
        if (!Validator.isLength(data.name, { min: 2, max: 20})){
            errors.namelength = "Name must be between 2 and 20 characters";
        };
    }


    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    };
    
    if(!Validator.isEmail(data.email)){
        errors.email = "Valid email is required";
    };

    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    } else {
        if(!Validator.isLength(data.password, {min: 6, max: 20})){
            errors.pwlength = "Password must be at least 6 characters";
        } else {
            if(!Validator.equals(data.password, data.password2)){
                errors.pwmatch = "Passwords must match";
            };
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput