const express = require("express");
const router = express.Router();
const passport = require('passport');

// GET api/profiles/test
// DESC: profiles test route
// ACCESS: public
router.get("/test", (req, res) =>
  res.json({ test: "profiles test route works" })
);
// Profiles model
const Profile = require('../../models/profile')
const User = require('../../models/user') // will allow User query who's 'session' info is in passport/jwt
const Social = require('../../models/social');
const Experience = require('../../models/experience');
const Skill = require('../../models/skill');
const Education = require('../../models/education');


// GET api/profiles { root }
// DESC: User authentication route
// ACCESS: private
router.get("/", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find({ where: { userId: req.user.id } })
      .then(profile => {
        if (!profile) {
          res.json({ msg: "No profile found" })
        }
        res.json(profile)
      })
      .catch(err => res.status(404).json(err))
  }
)

// POST api/profiles { root }
// DESC: create user profile
// ACCESS: private
router.post("/", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log("req.body object = ", req.body)
    User.find({ where: { id: req.user.id } })
      .then(user => {
        let profileInput = req.body;       // create object for profile entry values
        let socialInput = req.body          // create object for social entry values
        let edInput = req.body          // create object for education entry values
        let expInput = req.body          // create object for experience entry values
        let skillInput = req.body          // create object for skill entry values
        profileInput.userId = user.id;
        Profile.find({ where: { userId: user.id } })
          .then(profile => {
            if (profile) {
              // update profile with new values
              console.log("update route");
              profile.update(req.body)
                .then(profile => res.json(profile))
            }
            else {
              console.log("Creating new profile")
              console.log("profileInput = ", profileInput)
              Profile.create(profileInput)
                .then(profile => {
                  socialInput.profileId = profile.id;
                  Social.create(socialInput)
                })
                .catch(err => {
                  console.log(err)
                })
                // will need a loop for multiple Education, Skills, Experiences field.
                .then(profile => {
                  edInput.profileId = profile.id;
                  Education.create(edInput)
                })
                .catch(err => {
                  console.log(err)
                })
                .then(profile => {
                  expInput.profileId = profile.id;
                  Experience.create(expInput)
                })
                .catch(err => {
                  console.log(err)
                })
                .then(profile => {
                  skillInput.profileId = profile.id;
                  Skill.create(skillInput)
                })
                .catch(err => {
                  console.log(err)
                })
            }
          })
      })

  })

module.exports = router

