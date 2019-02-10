const Sequelize = require("sequelize");
const db = require("../config/dbconnect").postGres;
const sequelize = new Sequelize(db);

const Comment = sequelize.define('comment', 
    {
        author: {type: Sequelize.STRING},
        text: {type: Sequelize.STRING}
    });

Comment.sync()

module.exports = Comment