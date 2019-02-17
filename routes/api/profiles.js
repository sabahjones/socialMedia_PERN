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
    console.log("req.body object = ", req.body)
    User.find({ where: { id: req.user.id } })
      .then(user => {
        let profileInput = {};
        profileInput = req.body;
        profileInput.userId = user.id;
        // created values for profile row
        let socialInput = req.body

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
              Profile.create(profileInput, user)
                .then(profile => res.json(profile))
                .catch(err => res.json(err))
            }
          })
      })

  })

module.exports = router

