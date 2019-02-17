const express = require("express"),
  path = require("path"),
  bodyParser = require("body-Parser"),
  Sequelize = require("sequelize");
passport = require('passport');

const app = express();

/*  connect DB and test connection referencing 
./config/dbconnect.js file for connection 
variables  */
const connect = require("./config/dbconnect");
const sequelize = new Sequelize(connect.postGres);

// import db models & define base route
const User = require("./models/user");
const Profile = require("./models/profile");
const Social = require("./models/social");
const Skill = require("./models/skill");
const experiences = require("./models/experience");
const Education = require("./models/education")
// DB DUMMY DATA

// User.sync({ force: true }).then(() => {
//   return User.create({
//     name: 'Sabah',
//     email: 'sabah@email.com',
//     password: 'password',
//     avatar: '',
//     date: null
//   })
// })


// Profile.sync({ force: true }).then(() => {
//   return Profile.create({
//     handle: 'Jack the Pirate',
//     company: 'Dread Naught II',
//     userId: '1'
//   })
// })

Social.sync({ force: true }).then(() => {
  return Profile.create({
    youtube: 'www.facebook/superman the Pirate',
    twitter: 'twitter',
    profileId: '1'
  })
})


// middleware
// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//  passport
app.use(passport.initialize());
require('./config/passport')(passport)


// file path for views
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

//API routes assigned to
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

app.get("/", (req, res) => res.send("<h1>server running</h1>"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
