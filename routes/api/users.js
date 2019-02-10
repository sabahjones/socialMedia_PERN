const express = require("express");
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// pull in User model
const User = require('../../models/users')

//  route: GET /api/users/test
//  desc: test for users route
//  access: public
router.get("/test", (req, res) => res.json({ test: "users test route works" }));

//  route: Post api/users/register
//  desc: Register new user
//  access: public
router.post("/register", (req, res) => {
    User.find({ where: { email: req.body.email }})
        .then((user) => {
            if(user){
                return res.status(400).json({ email: 'Email already exists'});
            } else {
                //create avatar for user using gravatar api
                const avatar = gravatar.url(req.body.email, {
                        s: '200', // size
                        r: 'pg',  // rating
                        d: 'mm'   // default value
                    });

                //create user, use avatar and bcypt values
                const newUser = User.create({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                })
                .then((user) => bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if(err) { 
                            console.log('******************')
                            console.log('error = ', err)
                            console.log('******************')

                        } else { 
                                user.password = hash
                                user.save()
                                    .then(user => res.json(user))
                                    .catch(err => console.log(err));
                            };
                    });
                }));
            };
        });
});

// user attempts to login using email/password
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //find user via email
    User.find({ where: {email}})
        .then(user => {
            if (!user){
                return res.status(404).json({ email: 'User not found'})
            }
        // found user email; check password
        bcrypt.compare(password, user.password)
            .then(match => {
                if (!match) {
                    return res.status(400).json({ password: 'Password is incorrect'})
                } else {
                    res.json({ msg: 'login successful'})
                }
            })
        })
})
module.exports = router;
