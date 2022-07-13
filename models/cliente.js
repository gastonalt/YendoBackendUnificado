'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cliente extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
/*             Cliente.belongsTo(models.Persona);
            Cliente.hasMany(models.Evento); */
        }
    }
    Cliente.init({
        fechaNacimiento: {
            type: DataTypes.DATEONLY,
        },
        tipoDni: {
            type: DataTypes.STRING,
        },
        numeroDni: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'Cliente',
    });
    return Cliente;
};