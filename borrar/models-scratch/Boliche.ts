const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config");

class Boliche extends Model { }

Boliche.init({
    idBoliche: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profilePic: {
        type: DataTypes.STRING
    },
    coverPic: {
        type: DataTypes.STRING
    },
    passwordBoliche: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'boliches' // We need to choose the model name
});