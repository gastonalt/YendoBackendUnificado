const { Sequelize } = require("sequelize");

const sequelizeObj = new Sequelize('yendoappduenos', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
})

// We export the sequelize connection instance to be used around our app.
module.exports = sequelizeObj;