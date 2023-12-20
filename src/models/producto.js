const sequelize = require('./conexion');
const { DataTypes } = require("sequelize");
const Categoria  = require("./categoria");
const Licencia = require('./licencia');

const Producto = sequelize.define('Product', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descuento:{
        type: DataTypes.INTEGER,
    },
    cuotas:{
        type: DataTypes.INTEGER,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    SKU:{
        type: DataTypes.STRING,
    },
    imagen_front:{
        type: DataTypes.STRING,
    },
    imagen_back:{
        type: DataTypes.STRING,
    }
})

Producto.belongsTo(Categoria)
Producto.belongsTo(Licencia)

module.exports = Producto