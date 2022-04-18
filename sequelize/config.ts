const { Sequelize } = require("sequelize");

const sequelizeObj = new Sequelize('database', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
})

module.exports = sequelizeObj