const app = require('./app/app')
const config = require('./config/config')
const sequelize = require('../src/app/database/dataBase_connection')

const connectionWithDbAndServerListening = async sq => {
    try {
        await sq.authenticate();
        console.log('Connection has been established successfully.')
        app.listen(config.SERVER_PORT, () => {
            console.log('Server listen in port ' + config.SERVER_PORT)
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

connectionWithDbAndServerListening(sequelize)

module.exports = sequelize