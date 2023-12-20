const sequelize = require('./conexion');
const { DataTypes } = require("sequelize");

const Licencia = sequelize.define('Licencia', {
    nombre:{
        type: DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING
    },
    imagen:{
        type: DataTypes.STRING
    }
})

module.exports = Licencia