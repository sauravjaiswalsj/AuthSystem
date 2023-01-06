const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model{}

User.init({
    name:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING,
    },
    token:{
        type:DataTypes.STRING,
        defaultValue: ''
    }
},
{sequelize, modelName: "User"}
// We need to pass the sequelize instance (mandatory) 
//and set the name of the model (optional). By default the model name is same as Class name
);

module.exports = User;