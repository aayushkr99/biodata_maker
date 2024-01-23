const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const UrlStatus = sequelize.define(
  "htmlItems",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    html: {
        type: DataTypes.STRING(10000), // Use TEXT data type for storing HTML content
        allowNull: false,
      },
    template: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

(async () => {
  await sequelize.sync();
  console.log("Model synchronized with the database.");
})();

module.exports = UrlStatus;
