const Validator = require('validator');
const isEmpty = require('./empty');

const validateRegisterInput = (regInput) => {
    let errors = {};

    regInput.name = !isEmpty(regInput.name) ? regInput.name : '';
    regInput.email = !isEmpty(regInput.email) ? regInput.email : '';
    regInput.password = !isEmpty(regInput.password) ? regInput.password : '';
    regInput.password2 = !isEmpty(regInput.password2) ? regInput.password2 : '';

    if(Validator.isEmpty(regInput.name)){
        errors.name = "Name field is required";
    } else {
        if (!Validator.isLength(regInput.name, { min: 2, max: 20})){
            errors.namelength = "Name must be between 2 and 20 characters";
        };
    }

    if(Validator.isEmpty(regInput.email)){
        errors.email = "Email field is required";
    };
    
    if(!Validator.isEmail(regInput.email)){
        errors.email = "Valid email is required";
    };

    if(Validator.isEmpty(regInput.password)){
        errors.password = "Password field is required";
    } else {
        if(!Validator.isLength(regInput.password, {min: 6, max: 20})){
            errors.pwlength = "Password must be at least 6 characters";
        } else {
            if(!Validator.equals(regInput.password, regInput.password2)){
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