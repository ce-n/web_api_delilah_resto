const Sequelize = require('sequelize')
const config = require('./config/config')
const DBQueryConnection = `mysql://${config.DDBB.USER}:${config.DDBB.PASS}@${config.DDBB.HOST}:${config.DDBB.PORT}/${config.DDBB.NAME}`

const sequelize = new Sequelize(DBQueryConnection)

module.exports = sequelize