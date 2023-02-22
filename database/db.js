const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_SERVER,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.BD_DATABASE,
  logging: false,
});

module.exports = { db };
