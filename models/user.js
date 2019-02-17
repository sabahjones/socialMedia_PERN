
const Sequelize = require("sequelize");
const db = require("../config/dbconnect").postGres;
const sequelize = new Sequelize(db);

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATE,
    default: Sequelize.NOW
  }
});

User.sync();

module.exports = User


