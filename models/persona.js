'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Persona extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Persona.init({
        idPersona: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipoDni: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nroDni: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imgURL: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Persona',
    });
    return Persona;
};