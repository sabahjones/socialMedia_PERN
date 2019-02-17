const Sequelize = require("sequelize");
const db = require("../config/dbconnect").postGres;
const sequelize = new Sequelize(db);
const Profile = require("./profile")


const Education = sequelize.define('education', {
  school: { type: Sequelize.STRING },
  degree: { type: Sequelize.STRING },
  field: { type: Sequelize.STRING },
  from: { type: Sequelize.DATE },
  to: { type: Sequelize.DATE },
  current: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
});

// Profile will obtain foreignKey 'userId' 
Education.belongsTo(Profile);

Education.sync();

module.exports = Education