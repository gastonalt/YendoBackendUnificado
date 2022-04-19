'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BolicheEvento extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    BolicheEvento.init({}, {
        sequelize,
        modelName: 'BolicheEvento',
    });


    Boliche.hasMany(Evento);
    Evento.belongsTo(Boliche);

    return BolicheEvento;

};