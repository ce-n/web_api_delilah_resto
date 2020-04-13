const Status = require('./status_model')

const querysStatusTable = {
    getAllStatus: async(sequelize) => {
        try {
            const query = 'SELECT * FROM status'
            const status = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
            return status
        } catch (error) {
            console.log('EL ERROR ES: ' + error)
        }
    },

    insertNewStatus: async(sequelize, { current_status }) => {
        try {
            const status = new Status(current_status)
            const query = 'INSERT INTO status (current_status) VALUES (?)'
            await sequelize.query(query, {
                replacements: [status.current_status]
            })

        } catch (error) {
            console.log(error)
        }
    },

    updateStatusByID: async(sequelize, id, statusData) => {
        try {
            for (const property in statusData) {
                const query = `UPDATE status SET ${property} = ? WHERE id = ?`
                await sequelize.query(query, { replacements: [statusData[property], id] })
            }
        } catch (error) {
            console.log(error)
        }
    },

    deleteStatusById: async(sequelize, id) => {
        try {
            const query = 'DELETE FROM status WHERE id = ?'
            await sequelize.query(query, { replacements: [id] })

        } catch (error) {
            console.log(error)
        }

    }

}
module.exports = querysStatusTable