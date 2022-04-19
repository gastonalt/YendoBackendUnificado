'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Boliche extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Boliche.hasMany(models.Evento);
            Boliche.hasMany(models.Admin)
        }
    }
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
        sequelize,
        modelName: 'Boliche',
    });
    return Boliche;
};