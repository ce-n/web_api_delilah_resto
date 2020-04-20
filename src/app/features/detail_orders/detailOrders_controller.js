const DetailOrder = require('./detailOrders_model')

const detailOrdersTableQueries = {

    getAllDetailOrders: async(sequelize) => {
        try {
            const detail_order = await sequelize.query('SELECT * FROM detail_order', { type: sequelize.QueryTypes.SELECT })
            return detail_order
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    insertNewDetailtOrder: async(sequelize, client_order_id) => {
        try {
            const detail_order = new DetailOrder(client_order_id)
            const query = 'INSERT INTO detail_order (client_order_id) VALUES (?)'
            const response = await sequelize.query(query, {
                type: sequelize.QueryTypes.INSERT,
                replacements: [detail_order.client_order_id]
            })
            const lastInsertID = response[0]
            console.log('The id of the last record is: ' + lastInsertID)
            return lastInsertID

        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    updateDetailOrderById: async(sequelize, id, client_order_id) => {
        try {
            const query = `UPDATE detail_order SET client_order_id = ? WHERE id = ?`
            await sequelize.query(query, { replacements: [client_order_id, id] })
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    deleteDetailOrderById: async(sequelize, id) => {
        try {
            const query = 'DELETE FROM detail_order WHERE id = ?'
            await sequelize.query(query, { replacements: [id] })

        } catch (error) {
            return console.log('Error message: ' + error)
        }

    }

}

module.exports = detailOrdersTableQueries