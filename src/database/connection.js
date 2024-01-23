const { Sequelize } = require("sequelize");
const config = require("../../config/config.json")

const connection = {
  timezone: "+05:30",
  ...config.development,
  logging: console.log, // Enable logging for development
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }, dialectOptions: {
    connectTimeout: 60000, // Set a higher timeout value (in milliseconds)
  },
};
console.log("connections -=-=-=-", connection);
const sequelize = new Sequelize(connection);

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.log("reconnecting to db .......");
    setTimeout(dbConnect, 10000);
  }
};
dbConnect();

module.exports = sequelize;
