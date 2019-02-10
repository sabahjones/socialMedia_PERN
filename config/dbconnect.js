const sequelize = require("sequelize");

module.exports = {
  postGres: "postgres://socialMediaAdmin:admin@localhost/devconnectDB",
  what: db => (sequelize = new Sequelize(db)),
  auth: sql =>
    sql
      .authenticate()
      .then(() => {
        console.log("PostGres DB Connected");
      })
      .catch(err => {
        console.error(err);
      })
};
