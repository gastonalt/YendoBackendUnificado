'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Evento extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Evento.init({
        idEvento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FechaHora: {
            type: DataTypes.DATE,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coverImg: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bolicheId: {
            type: DataTypes.INTEGER,
            references: {
                model: Boliche,
                key: 'id'
            }
        },
        cantidadTotal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidadDisponible: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Evento',
    });

    Evento.hasOne(Boliche);

    return Evento;
};