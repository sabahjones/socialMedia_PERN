const Sequelize = require('sequelize')
const db = require("../config/dbconnect").postGres;
const sequelize = new Sequelize(db);
const Profile = require("./profile")


const Social = sequelize.define('social', {
  youtube: {
    type: Sequelize.STRING
  },
  twitter: {
    type: Sequelize.STRING
  },
  facebook: {
    type: Sequelize.STRING
  },
  linkedIn: {
    type: Sequelize.STRING
  },
  instagram: {
    type: Sequelize.STRING
  },
})

Social.belongsTo(Profile)

Social.sync();

module.exports = Social
