const express = require("express"),
      path = require("path"),
      bodyParser = require("body-Parser"),
      Sequelize = require("sequelize");
      passport = require('passport');

const app = express();

/*  connect DB and test connection referencing 
./config/dbconnect.js file for connection 
variables  */
const createdb = require("./config/dbconnect");
const sequelize = new Sequelize(createdb.postGres);
const test = createdb.auth(sequelize);

// import db models & define base route
// purely for development
const User = require("./models/users");
const Comment = require("./models/comments")

/* test user and comment models using 
a query with dummy data */
// development only.
User.sync({force: true}).then(() => {
  return User.create({
    name: 'Player1',
    email: 'player1@email.com',
    password: 'password',
    avatar: '',
    date: null
  });
});

// middleware
  // body parser
app.use(bodyParser.urlencoded({extended: false}))
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
