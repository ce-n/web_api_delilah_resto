const ClientOrder = require('./clientOrders_model')

const clientesOrdersTableQueries = {

    getAllClientsOrders: async(sequelize) => {
        try {
            const client_orders = await sequelize.query('SELECT * FROM client_order', { type: sequelize.QueryTypes.SELECT })
            return client_orders
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    getClientOrderById: async(sequelize, id) => {
        try {
            const query = `SELECT
                            user.id AS user_ID, 
                            user.name AS user_name, 
                            user.lastname AS user_lastname, 
                            user.email AS user_email, 
                            user.telephone AS user_telephone, 
                            user.address AS user_adress,
                            client_order.id AS client_order_ID, 
                            client_order.hour AS client_order_hour, 
                            status.current_status AS order_status,
                            payment_method.method AS payment_method,
                            product.name AS product_name, 
                            product.price_per_unit AS product_price_per_unit, 
                            product.image_url AS product_image_url,  
                            detail_per_product.number_of_unit AS product_amount, 
                            detail_per_product.subtotal AS subtotal_per_product
                            FROM user 
                            LEFT JOIN client_order
                            ON user.id = client_order.user_id
                            LEFT JOIN status
                            ON client_order.status_id = status.id
                            LEFT JOIN payment_method
                            ON client_order.payment_id = payment_method.id
                            LEFT JOIN detail_order 
                            ON client_order.id = detail_order.client_order_id 
                            LEFT JOIN detail_per_product 
                            ON detail_order.id = detail_per_product.detail_order_id 
                            LEFT JOIN product ON detail_per_product.product_id = product.id 
                            WHERE client_order.id = ?`

            const client_order = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                replacements: [id]
            })
            console.log(client_order)
            return client_order
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    getClientOrderFilterByClientIdAndOrderId: async(sequelize, userid, orderid) => {
        try {
            const query = `SELECT
                            user.id AS user_ID, 
                            user.name AS user_name, 
                            user.lastname AS user_lastname, 
                            user.email AS user_email, 
                            user.telephone AS user_telephone, 
                            user.address AS user_adress,
                            client_order.id AS client_order_ID, 
                            client_order.hour AS client_order_hour, 
                            status.current_status AS order_status,
                            payment_method.method AS payment_method,
                            product.name AS product_name, 
                            product.price_per_unit AS product_price_per_unit, 
                            product.image_url AS product_image_url,  
                            detail_per_product.number_of_unit AS product_amount, 
                            detail_per_product.subtotal AS subtotal_per_product
                            FROM user 
                            LEFT JOIN client_order
                            ON user.id = client_order.user_id
                            LEFT JOIN status
                            ON client_order.status_id = status.id
                            LEFT JOIN payment_method
                            ON client_order.payment_id = payment_method.id
                            LEFT JOIN detail_order 
                            ON client_order.id = detail_order.client_order_id 
                            LEFT JOIN detail_per_product 
                            ON detail_order.id = detail_per_product.detail_order_id 
                            LEFT JOIN product ON detail_per_product.product_id = product.id 
                            WHERE user.id = ?
                            AND client_order.id= ?`

            const client_order = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                replacements: [userid, orderid]
            })
            console.log(client_order)
            return client_order
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    insertNewClientOrder: async(sequelize, { hour, user_id, status_id, payment_id }) => {
        try {
            const clientOrder = new ClientOrder(hour, user_id, status_id, payment_id)
            const query = 'INSERT INTO client_order (hour, user_id, status_id, payment_id) VALUES (?, ?, ?,?)'
            const response = await sequelize.query(query, {
                type: sequelize.QueryTypes.INSERT,
                replacements: [clientOrder.hour, clientOrder.user_id, clientOrder.status_id, clientOrder.payment_id]
            })

            const lastInsertID = response[0]
            console.log('The id of the last record is: ' + lastInsertID)
            return lastInsertID

        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    updateClientOrderById: async(sequelize, id, clientOrderData) => {
        try {
            for (const property in clientOrderData) {
                const query = `UPDATE client_order SET ${property} = ? WHERE id = ?`
                await sequelize.query(query, { replacements: [clientOrderData[property], id] })
            }
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    updateClientOrderStatusById: async(sequelize, id, status) => {
        try {
            const query = `UPDATE client_order SET status_id = ? WHERE id = ?`
            await sequelize.query(query, { replacements: [status, id] })
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    deleteClientOrderById: async(sequelize, id) => {
        try {
            const query = 'DELETE FROM client_order WHERE id = ?'
            await sequelize.query(query, { replacements: [id] })

        } catch (error) {
            return console.log('Error message: ' + error)
        }

    }

}

module.exports = clientesOrdersTableQueries