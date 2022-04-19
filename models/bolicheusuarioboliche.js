'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BolicheUsuarioBoliche extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    BolicheUsuarioBoliche.init({}, {
        sequelize,
        modelName: 'BolicheUsuarioBoliche',
    });

    Boliche.hasMany(Persona, { through: 'BolicheUsuarioBoliche' });
    Persona.belongsTo(Boliche, { through: 'BolicheUsuarioBoliche' });

    return BolicheUsuarioBoliche;
};