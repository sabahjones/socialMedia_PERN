const Sequelize = require("sequelize");
const db = require("../config/dbconnect").postGres;
const sequelize = new Sequelize(db);
const Profile = require("./profile")

const Skill = sequelize.define('skill', {
    name: { type: Sequelize.STRING }
})

Skill.belongsTo(Profile)
Skill.sync();

module.exports = Skill