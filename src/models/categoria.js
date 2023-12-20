const sequelize = require('./conexion');
const { DataTypes } = require("sequelize");

const Categoria = sequelize.define('Category', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
    }
})

module.exports = Categoria