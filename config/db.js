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

const sequelize = createDb;

//authenticate the db
sequelize.authenticate()
    .then(()=>{
        console.log(`Authenticated to DB successfully.`);
    })
    .catch(err=>{
        console.log(`Error occured during db connection: ${err}`);
});

module.exports = createDb;