
const Sequelize = require("sequelize");
const db = require("../config/dbconnect").postGres;
const sequelize = new Sequelize(db);
const User = require('./user');
// const Social = require('./social');
// const Education = require('./education');
// const Skill = require("./skills");
// const Experience = require("./experience");

const Profile = sequelize.define('profile', {
  handle: { type: Sequelize.STRING },
  company: { type: Sequelize.STRING },
  website: { type: Sequelize.STRING },
  location: { type: Sequelize.STRING },
  status: { type: Sequelize.STRING },
  skills: { type: Sequelize.STRING },
  bio: { type: Sequelize.STRING },
  github: { type: Sequelize.STRING }
});

// Profile will obtain foreignKey 'userId' 
Profile.belongsTo(User);

Profile.sync();

module.exports = Profile


