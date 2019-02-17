const Sequelize = require('sequelize');
const db = require('../config/dbconnect').postGres;
const sequelize = new Sequelize(db);
const Profile = require("./profile")


const Experience = sequelize.define('experience', {

  title: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  company: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  location: {
    type: Sequelize.STRING,
  },
  companyfrom: {
    type: Sequelize.DATE,
    // allowNull: false
  },
  companycurrent: {
    type: Sequelize.BOOLEAN,
    // allowNull: false
  },
  companyto: {
    type: Sequelize.DATE,
    // allowNull: false
  },
  description: {
    type: Sequelize.STRING,
  }
})

Experience.belongsTo(Profile);

Experience.sync();

module.exports = Experience