const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const user = process.env.user;
const password = process.env.password;

//* Instantiates sequelize with the name of database, username, password and configuration options
const createDb = new Sequelize("test-db",user,password,{
    dialect: "sqlite",
    host:"./config/db.sqlite"
});

module.exports = createDb;