const sequelize = require('./conexion')
const { DataTypes } = require("sequelize");

const bycript = require("bcryptjs")

const User = sequelize.define('User', {
    name:{
        type: DataTypes.STRING,
    },
    lastname:{
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.beforeSave(async (user,option)=>{
    const { password} = user;
    const hash = await bycript.hash(password, 10)

    user.password = hash
})

module.exports = User
