'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClienteEvento extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ClienteEvento.init({
        fechaHoraReserva: DataTypes.DATE,
        activa: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'ClienteEvento',
    });

    Persona.hasMany(Evento, { through: 'ClienteEvento' });
    Evento.belongsTo(Persona, { through: 'ClienteEvento' });

    return ClienteEvento;


};