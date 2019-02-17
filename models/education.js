const Sequelize = require("sequelize");
const db = require("../config/dbconnect").postGres;
const sequelize = new Sequelize(db);
const Profile = require("./profile")


const Education = sequelize.define('education', {
  school: { type: Sequelize.STRING },
  degree: { type: Sequelize.STRING },
  field: { type: Sequelize.STRING },
  schoolfrom: { type: Sequelize.DATE },
  schoolto: { type: Sequelize.DATE },
  schoolcurrent: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
});

// Profile will obtain foreignKey 'userId' 
Education.belongsTo(Profile);

Education.sync();

module.exports = Education